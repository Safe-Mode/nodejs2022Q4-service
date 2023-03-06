import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavoritesResponseDto } from './dto/favorites-response.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<FavoritesResponseDto> {
    const [favorite] = await this.prisma.favorites.findMany({
      select: {
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true,
          },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });

    return favorite ?? new FavoritesResponseDto();
  }
}
