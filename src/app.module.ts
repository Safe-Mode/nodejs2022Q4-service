import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppDB } from './app.db';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService, AppDB],
})
export class AppModule {}
