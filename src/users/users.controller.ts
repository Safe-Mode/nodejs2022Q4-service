import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponseDto> {
    return this.usersService.getById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<UserResponseDto> {
    return this.usersService.delete(id);
  }
}
