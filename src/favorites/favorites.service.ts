import { Injectable } from '@nestjs/common';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { Artist } from 'src/artists/models/artist';
import { Album } from 'src/albums/models/album';
import { Track } from 'src/tracks/models/track';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {
  }

  async getAll() {
    const [favorite] = await this.prisma.favorites.findMany({
      select: {
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true
          }
        },
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true
          }
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true
          }
        }
      }
    });

    return favorite ?? new FavoritesResponseDto();
  }
}
