import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";

// user.service.interface.ts
export interface UserServiceInterface {
    createUser(dto: CreateUserDto): Promise<any>;
    getUserById(id: string): Promise<any>;
    updateUser(id: string, dto: UpdateUserDto): Promise<any>;
    deleteUser(id: string): Promise<any>;
  }
  