import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UserController } from '../controller/user.controller';
import { UserSQLService } from '../service/user.sql.service';
import { UserNoSQLService } from '../service/user.nosql.service';
import { AuthGuard } from '../guards/auth.guard';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { HTTPExceptionFilter } from '../filters/exception.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from '../middlewares/logger.middleware';
import { User as SQLUser } from '../entities/user.entity';
import { User, UserSchema, UserDocument } from '../schemas/user.schema';
import { Repository } from 'typeorm';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResolver } from '../resolvers/user.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available globally
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as 'mysql' | 'postgres',
        host: configService.get<string>('SQL_HOST'),
        port: configService.get<number>('SQL_PORT'),
        username: configService.get<string>('SQL_USERNAME'),
        password: configService.get<string>('SQL_PASSWORD'),
        database: configService.get<string>('SQL_DATABASE'),
        entities: [SQLUser],
        synchronize: true, // Set to false in production
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MongooseModuleOptions => ({
        uri: configService.get<string>('MONGO_URI'),
        ssl: true,
      } as MongooseModuleOptions),
    }),
    TypeOrmModule.forFeature([SQLUser]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController, UserResolver],
  providers: [
    AuthGuard,
    LoggingInterceptor,
    HTTPExceptionFilter,
    {
      provide: 'UserService',
      useFactory: (
        configService: ConfigService,
        sqlUserRepository: Repository<SQLUser>,
        mongoUserModel: Model<UserDocument>,
      ) => {
        const dbType = configService.get<string>('DB_TYPE');
        if (dbType === 'sql') {
          return new UserSQLService(sqlUserRepository);
        } else {
          return new UserNoSQLService(mongoUserModel);
        }
      },
      inject: [ConfigService, getModelToken(User.name)],
    },
  ],
  exports: [ConfigService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController, UserResolver);
  }
}
