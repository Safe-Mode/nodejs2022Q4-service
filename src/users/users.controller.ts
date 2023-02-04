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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './models/user';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll(): User[] {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string): User {
    return this.usersService.getById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdatePasswordDto,
  ): User {
    return this.usersService.updateById(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    this.usersService.deleteUser(id);
    return null;
  }
}
