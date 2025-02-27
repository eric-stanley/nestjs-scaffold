// user.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';
import { UserServiceInterface } from '../interface/user.service.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { HTTPExceptionFilter } from '../filters/exception.filter';
import { Inject } from '@nestjs/common';

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
@UseFilters(HTTPExceptionFilter)
export class UserController {
  constructor(@Inject('UserService') private readonly userService: UserServiceInterface) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
