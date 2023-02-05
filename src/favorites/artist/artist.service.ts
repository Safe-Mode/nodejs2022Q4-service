import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AppDbField, DbService } from 'src/db/db.service';

@Injectable()
export class ArtistService {
  constructor(private db: DbService) {}

  addToFavorites(uuid: string) {
    const artist = this.db.getById(AppDbField.ARTISTS, uuid);

    if (artist) {
      this.db.addToFavorites(AppDbField.ARTISTS, uuid);
    } else {
      throw new UnprocessableEntityException();
    }

    return artist;
  }

  deleteFromFavorites(uuid: string) {
    return this.db.deleteFromFavorites(AppDbField.ARTISTS, uuid);
  }
}
