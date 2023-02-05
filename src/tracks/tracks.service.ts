import { Injectable } from '@nestjs/common';
import { AppDB, AppDbField } from 'src/app.db';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './models/track';

@Injectable()
export class TracksService {
  constructor(private db: AppDB) {}

  getAll(): Track[] {
    return this.db.getAll(AppDbField.TRACKS) as Track[];
  }

  getById(uuid: string): Track {
    return this.db.getById(AppDbField.TRACKS, uuid) as Track;
  }

  create(data: CreateTrackDto): Track {
    return this.db.createTrack(data);
  }

  update(uuid: string, data: Partial<CreateTrackDto>): Track {
    return this.db.update(AppDbField.TRACKS, uuid, data) as Track;
  }

  delete(uuid: string): Track {
    return this.db.delete(AppDbField.TRACKS, uuid) as Track;
  }
}
