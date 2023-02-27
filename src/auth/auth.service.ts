import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { User } from 'src/users/models/user';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { env } from 'node:process';
import { LoginResponseDto } from './dto/login-response.dto';
import { GetTokensResponse } from './types/get-tokens-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string): Promise<UserResponseDto> {
    const user = await this.usersService.getByName(login);

    if (user && await argon2.verify(user.password, password)) {
      const { password, ...result } = user;

      return {
        ...result,
        createdAt: new Date(result.createdAt).valueOf(),
        updatedAt: new Date(result.updatedAt).valueOf()
      };
    }
    
    return null;
  }

  async signup({ login, password }: CreateUserDto): Promise<UserResponseDto> {
    const hash = await AuthService.hashData(password);
    const createdUser = await this.usersService.create({
      login,
      password: hash
    });
    const tokens = await this.getTokens(createdUser.id, createdUser.login);

    await this.updateRefreshToken(createdUser.id, tokens.refreshToken);

    return createdUser;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const payload = { username: user.login, sub: user.id };
    const tokens = await this.getTokens(user.id, user.login);

    await this.updateRefreshToken(user.id, tokens.refreshToken);
    
    return {
      id: user.id,
      accessToken: this.jwtService.sign(payload),
      refreshToken: tokens.refreshToken
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token was provided');
    }
    
    const user = await this.usersService.getById(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async getTokens(userId: string, login: string): Promise<GetTokensResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: env.JWT_SECRET_KEY,
          expiresIn: env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: env.JWT_SECRET_REFRESH_KEY,
          expiresIn: env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await AuthService.hashData(refreshToken);
    this.usersService.refresh(userId, hashedRefreshToken);
  }

  static hashData(data: string): Promise<string> {
    return argon2.hash(data);
  }
}