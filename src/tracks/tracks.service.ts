import { Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  getById(uuid: string): Promise<Track> {
    return this.prisma.track.findUnique({
      where: { id: uuid }
    });
  }

  create(data: CreateTrackDto): Promise<Track> {
    return this.prisma.track.create({ data });
  }

  update(uuid: string, data: Partial<CreateTrackDto>): Promise<Track> {
    return this.prisma.track.update({
      where: { id: uuid },
      data
    });
  }

  delete(uuid: string): Promise<Track> {
    return this.prisma.track.delete({
      where: { id: uuid }
    });
  }
}
