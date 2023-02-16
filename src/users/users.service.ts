import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  getById(id: string): Promise<UserResponseDto> {
    return this.prisma.user.findUnique({
      where: { id }
    });
  }

  create(data: CreateUserDto): Promise<UserResponseDto> {
    return this.prisma.user.create({ data });
  }

  async update(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    let user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (user) {
      if (user.password === oldPassword) {
        user = await this.prisma.user.update({
          where: { id },
          data: { password: newPassword }
        });
        delete user.password;
      } else {
        throw new ForbiddenException('Wrong password');
      }
    }

    return user;
  }

  delete(id: string): Promise<UserResponseDto> {
    return this.prisma.user.delete({
      where: { id }
    });
  }
}
