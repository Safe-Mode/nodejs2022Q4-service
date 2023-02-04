import { Module } from '@nestjs/common';
import { AppDB } from 'src/app.db';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, AppDB],
})
export class ArtistsModule {}
