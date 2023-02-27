import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Album } from 'src/albums/models/album';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  private favoritesId = '';

  constructor(private prisma: PrismaService) {
    this.prisma.favorites.findFirst().then(({ id }) => this.favoritesId = id);
  }

  async addToFavorites(uuid: string) {
    let album = await this.prisma.album.findUnique({
      where: { id: uuid }
    });

    if (album) {
      album = await this.prisma.album.update({
        where: { id: uuid },
        data: { favoritesId: this.favoritesId }
      });
    } else {
      throw new UnprocessableEntityException();
    }

    return album;
  }

  deleteFromFavorites(uuid: string) {
    return this.prisma.album.update({
      where: { id: uuid },
      data: { favoritesId: null }
    });
  }
}
