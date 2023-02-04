import { ForbiddenException, Injectable } from "@nestjs/common";
import { AppDB } from "src/app.db";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { User } from "./user";

@Injectable()
export class UsersService {
    constructor(private db: AppDB) {}

    getUsers(): User[] {
        return this.db.getAll('users');
    }

    getById(id: string): User {
        return this.db.getById(id);
    }

    createUser(data: CreateUserDto): User {
        return this.db.createUser(data);
    }

    updateById(id: string, { oldPassword, newPassword }: UpdatePasswordDto): User {
        const user = this.db.getById(id);

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
        return this.db.deleteUser(id);
    }
}