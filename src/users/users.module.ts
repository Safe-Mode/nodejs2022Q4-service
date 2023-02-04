import { Module } from '@nestjs/common';
import { AppDB } from 'src/app.db';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, AppDB]
})
export class UsersModule {
}