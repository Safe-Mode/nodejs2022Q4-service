import { ForbiddenException, Injectable } from '@nestjs/common';
import { AppDB, AppDbField } from 'src/app.db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './models/user';

@Injectable()
export class UsersService {
  constructor(private db: AppDB) {}

  getAll(): User[] {
    return this.db.getAll(AppDbField.USERS) as User[];
  }

  getById(id: string): User {
    return this.db.getById(AppDbField.USERS, id) as User;
  }

  create(data: CreateUserDto): User {
    return this.db.createUser(data);
  }

  update(id: string, { oldPassword, newPassword }: UpdatePasswordDto): User {
    const user = this.db.getById(AppDbField.USERS, id) as User;

    if (user) {
      if (user.password === oldPassword) {
        this.db.update(AppDbField.USERS, id, { password: newPassword });
      } else {
        throw new ForbiddenException('Wrong password');
      }
    }

    return user;
  }

  delete(id: string): void {
    this.db.delete(AppDbField.USERS, id);
  }
}
