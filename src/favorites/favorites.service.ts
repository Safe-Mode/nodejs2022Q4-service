import { Injectable } from '@nestjs/common';
import { AppDbField, DbService } from 'src/db/db.service';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { Artist } from 'src/artists/models/artist';
import { Album } from 'src/albums/models/album';
import { Track } from 'src/tracks/models/track';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private db: DbService, private prisma: PrismaService) {}

  async getAll(): Promise<FavoritesResponseDto> {
    const favorites = await this.prisma.favorites.findMany({
      select: {
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true
          }
        },
        albums: true,
        tracks: true
      }
    });

    if (!favorites) {
      return new FavoritesResponseDto();
    }
    
    const { artists, albums, tracks } = this.db.getFavorites();

    return new FavoritesResponseDto(
      artists
        .map((id) => this.db.getById(AppDbField.ARTISTS, id))
        .filter(Boolean) as Artist[],
      albums
        .map((id) => this.db.getById(AppDbField.ALBUMS, id))
        .filter(Boolean) as Album[],
      tracks
        .map((id) => this.db.getById(AppDbField.TRACKS, id))
        .filter(Boolean) as Track[],
    );
  }
}
