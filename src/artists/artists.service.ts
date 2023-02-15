import { Injectable } from '@nestjs/common';
import { AppDbField, DbService } from 'src/db/db.service';
import { Track } from 'src/tracks/models/track';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './models/artist';

@Injectable()
export class ArtistsService {
  constructor(private db: DbService) {}

  getAll(): Artist[] {
    return this.db.getAll(AppDbField.ARTISTS) as Artist[];
  }

  getById(uuid: string): Artist {
    return this.db.getById(AppDbField.ARTISTS, uuid) as Artist;
  }

  create(data: CreateArtistDto): Artist {
    return this.db.createArtist(data);
  }

  update(uuid: string, data: UpdateArtistDto): Artist {
    return this.db.update(AppDbField.ARTISTS, uuid, data) as Artist;
  }

  delete(uuid: string): Artist {
    const artist = this.db.delete(AppDbField.ARTISTS, uuid) as Artist;

    if (artist) {
      const relatedTrack = (this.db.getAll(AppDbField.TRACKS) as Track[]).find(
        ({ artistId }) => artistId === uuid,
      );
      this.db.update(AppDbField.TRACKS, relatedTrack?.id, { artistId: null });
    }

    return artist;
  }
}
