import { Injectable } from '@nestjs/common';
import { Album } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  getById(uuid: string): Promise<Album> {
    return this.prisma.album.findUnique({
      where: { id: uuid }
    });
  }

  create(data: CreateAlbumDto): Promise<Album> {
    return this.prisma.album.create({ data });
  }

  update(uuid: string, data: UpdateAlbumDto): Promise<Album> {
    return this.prisma.album.update({
      where: { id: uuid },
      data
    });
  }

  async delete(uuid: string): Promise<Album> {
    const album = await this.prisma.album.delete({
      where: { id: uuid }
    });

    if (album) {
      this.prisma.track.updateMany({
        where: { albumId: album.id },
        data: { albumId: null }
      });
    }

    return album;
  }
}
