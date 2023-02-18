import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AppDbField, DbService } from 'src/db/db.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private db: DbService, private prisma: PrismaService) {}

  async addToFavorites(uuid: string) {
    const artist = await this.prisma.favorites.findUnique({
      where: {
        id: uuid
      }
    });

    if (artist) {
      const fav = await this.prisma.favorites.create({
        data: {
          artists: {
            create: [artist]
          }
        }
      });
    } else {
      throw new UnprocessableEntityException();
    }

    return artist;
  }

  deleteFromFavorites(uuid: string) {
    return this.db.deleteFromFavorites(AppDbField.ARTISTS, uuid);
  }
}
