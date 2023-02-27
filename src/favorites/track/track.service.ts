import { Injectable } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { Track } from 'src/tracks/models/track';

@Injectable()
export class TrackService {
  private favoritesId = '';

  constructor(private prisma: PrismaService) {
    this.prisma.favorites.findFirst().then(({ id }) => this.favoritesId = id);
  }

  async addToFavorites(uuid: string) {
    let track = await this.prisma.track.findUnique({
      where: { id: uuid }
    });

    if (track) {
      track = await this.prisma.track.update({
        where: { id: uuid },
        data: { favoritesId: this.favoritesId }
      });
    } else {
      throw new UnprocessableEntityException();
    }

    return track;
  }

  deleteFromFavorites(uuid: string) {
    return this.prisma.track.update({
      where: { id: uuid },
      data: { favoritesId: null }
    });
  }
}
