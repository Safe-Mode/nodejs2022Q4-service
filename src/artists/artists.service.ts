import { Injectable } from '@nestjs/common';
import { AppDB, AppDbField } from 'src/app.db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './models/artist';

@Injectable()
export class ArtistsService {
  constructor(private db: AppDB) {}

  getAll(): Artist[] {
    return this.db.getAll(AppDbField.ARTISTS) as Artist[];
  }

  getById(uuid: string): Artist {
    return this.db.getById(AppDbField.ARTISTS, uuid) as Artist;
  }

  create(data: CreateArtistDto): Artist {
    return this.db.createArtist(data);
  }

  update(uuid: string, data: Partial<CreateArtistDto>): Artist {
    return this.db.update(AppDbField.ARTISTS, uuid, data) as Artist;
  }

  delete(uuid: string): void {
    this.db.delete(AppDbField.ARTISTS, uuid);
  }
}
