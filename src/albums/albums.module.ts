import { Module } from '@nestjs/common';
import { AppDB } from 'src/app.db';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, AppDB],
})
export class AlbumsModule {}
