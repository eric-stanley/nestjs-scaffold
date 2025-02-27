import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserServiceInterface } from '../interface/user.service.interface';

@Injectable()
export class UserSQLService implements UserServiceInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, dto);
    return this.userRepository.findOne({ where: { id } });
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
