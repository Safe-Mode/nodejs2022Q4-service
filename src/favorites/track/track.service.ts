import { Injectable } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common/exceptions';
import { AppDbField, DbService } from 'src/db/db.service';
import { Track } from 'src/tracks/models/track';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}

  addToFavorites(uuid: string): Track {
    const track = this.db.getById(AppDbField.TRACKS, uuid);

    if (track) {
      this.db.addToFavorites(AppDbField.TRACKS, uuid);
    } else {
      throw new UnprocessableEntityException();
    }

    return track as Track;
  }

  deleteFromFavorites(uuid: string): Track {
    return this.db.deleteFromFavorites(AppDbField.TRACKS, uuid);
  }
}
