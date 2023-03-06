import { Injectable } from '@nestjs/common';
import { Artist } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  getById(uuid: string): Promise<Artist> {
    return this.prisma.artist.findUnique({
      where: { id: uuid },
    });
  }

  create(data: CreateArtistDto): Promise<Artist> {
    return this.prisma.artist.create({ data });
  }

  update(uuid: string, data: UpdateArtistDto): Promise<Artist | null> {
    return this.prisma.artist
      .update({
        where: { id: uuid },
        data,
      })
      .catch(() => null);
  }

  delete(uuid: string): Promise<Artist> {
    return this.prisma.artist
      .delete({
        where: { id: uuid },
      })
      .catch(() => null);
  }
}
