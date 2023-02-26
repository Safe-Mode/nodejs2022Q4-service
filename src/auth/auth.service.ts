import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { User } from 'src/users/models/user';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(login: string, password: string): Promise<UserResponseDto> {
    console.log(password);
    
    const user = await this.usersService.getByName(login);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return {
        ...result,
        createdAt: new Date(result.createdAt).valueOf(),
        updatedAt: new Date(result.updatedAt).valueOf()
      };
    }
    
    return null;
  }

  signup(data: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(data);
  }

  login(user: User) {
    const payload = { username: user.login, sub: user.id };
    
    return {
      id: user.id,
      accessToken: this.jwtService.sign(payload)
    };
  }
}