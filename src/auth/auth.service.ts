import { Injectable } from '@nestjs/common';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<UserResponseDto> {
    const user = await this.usersService.getByName(username);

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
}