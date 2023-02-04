import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppDB } from './app.db';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TracksModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService, AppDB],
})
export class AppModule {}
