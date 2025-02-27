// user.resolver.ts
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';
import { UserServiceInterface } from '../interface/user.service.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { HTTPExceptionFilter } from '../filters/exception.filter';
import { Inject } from '@nestjs/common';
import { GraphQLJSON } from 'graphql-type-json';

@Resolver()
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
@UseFilters(HTTPExceptionFilter)
export class UserResolver {
  constructor(@Inject('UserService') private readonly userService: UserServiceInterface) {}

  @Mutation(() => CreateUserDto)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto): Promise<any> {
    return this.userService.createUser(createUserDto);
  }

  @Query(() => String)
  async user(@Args('id', { type: () => ID }) id: string): Promise<any> {
    return this.userService.getUserById(id);
  }

  @Mutation(() => String)
  async updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Mutation(() => String)
  async deleteUser(@Args('id', { type: () => ID }) id: string): Promise<any> {
    return this.userService.deleteUser(id);
  }
}