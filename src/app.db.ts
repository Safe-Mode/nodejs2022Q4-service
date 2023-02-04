import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "./users/dto/create-user.dto";
import { User } from "./users/user";

@Injectable()
export class AppDB {
    private users: User[] = [];

    getAll(fieldName: string): User[] {
        return this[fieldName];
    }

    getById(uuid: string): User {
        return this.users.find(({ id }) => id === uuid);
    }

    createUser({ login, password }: CreateUserDto): User {
        const user = new User(login, password);
        this.users.push(user);
        return user;
    }

    updateUser(id: string, data: Partial<User>): User {
        const user = this.getById(id);

        for (let field in data) {
            user[field] = data[field];
        }

        return user;
    }

    deleteUser(id: string): void {
        this.users.splice(this.users.findIndex((user) => user.id === id), 1);
    }
}