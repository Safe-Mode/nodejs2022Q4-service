import { Injectable } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common/exceptions';
import { Track } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  private favoritesId = '';

  constructor(private prisma: PrismaService) {
    this.prisma.favorites.findFirst().then(({ id }) => (this.favoritesId = id));
  }

  async addToFavorites(uuid: string): Promise<Track> {
    let track = await this.prisma.track.findUnique({
      where: { id: uuid },
    });

    if (track) {
      track = await this.prisma.track.update({
        where: { id: uuid },
        data: { favoritesId: this.favoritesId },
      });
    } else {
      throw new UnprocessableEntityException();
    }

    return track;
  }

  deleteFromFavorites(uuid: string): Promise<Track> {
    return this.prisma.track.update({
      where: { id: uuid },
      data: { favoritesId: null },
    });
  }
}
