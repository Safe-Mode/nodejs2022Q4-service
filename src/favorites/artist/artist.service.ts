import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  private favoritesId = '';

  constructor(private prisma: PrismaService) {
    this.prisma.favorites.findFirst().then(({ id }) => (this.favoritesId = id));
  }

  async addToFavorites(uuid: string) {
    let artist = await this.prisma.artist.findUnique({
      where: { id: uuid },
    });

    if (artist) {
      artist = await this.prisma.artist.update({
        where: { id: uuid },
        data: { favoritesId: this.favoritesId },
      });
    } else {
      throw new UnprocessableEntityException();
    }

    return artist;
  }

  deleteFromFavorites(uuid: string) {
    return this.prisma.artist.update({
      where: { id: uuid },
      data: { favoritesId: null },
    });
  }
}
