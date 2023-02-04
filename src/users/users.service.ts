import { ForbiddenException, Injectable } from '@nestjs/common';
import { AppDB } from 'src/app.db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './models/user';

@Injectable()
export class UsersService {
  constructor(private db: AppDB) {}

  getUsers(): User[] {
    return this.db.getAll<User>('users');
  }

  getById(id: string): User {
    return this.db.getById<User>('users', id);
  }

  createUser(data: CreateUserDto): User {
    return this.db.createUser(data);
  }

  updateById(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): User {
    const user = this.db.getById<User>('users', id);

    if (user) {
      if (user.password === oldPassword) {
        this.db.updateUser(id, { password: newPassword });
      } else {
        throw new ForbiddenException('Wrong password');
      }
    }

    return user;
  }

  deleteUser(id: string): void {
    this.db.delete('users', id);
  }
}
