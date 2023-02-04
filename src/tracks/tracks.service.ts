import { Injectable } from '@nestjs/common';
import { AppDB } from 'src/app.db';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './models/track';

@Injectable()
export class TracksService {
  constructor(private db: AppDB) {}

  getAll(): Track[] {
    return this.db.getAll('tracks');
  }

  getById(uuid: string): Track {
    return this.db.getById('tracks', uuid);
  }

  create(data: CreateTrackDto): Track {
    return this.db.createTrack(data);
  }

  update(uuid: string, data: Partial<CreateTrackDto>): Track {
    return this.db.updateTrack(uuid, data);
  }

  delete(uuid: string): void {
    this.db.delete('tracks', uuid);
  }
}
