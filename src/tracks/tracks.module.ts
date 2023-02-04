import { Module } from '@nestjs/common';
import { AppDB } from 'src/app.db';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, AppDB],
})
export class TracksModule {}
