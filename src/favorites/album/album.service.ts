import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Album } from 'src/albums/models/album';
import { AppDbField, DbService } from 'src/db/db.service';

@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}

  addToFavorites(uuid: string): Album {
    const album = this.db.getById(AppDbField.ALBUMS, uuid) as Album;

    if (album) {
      this.db.addToFavorites(AppDbField.ALBUMS, uuid);
    } else {
      throw new UnprocessableEntityException();
    }

    return album;
  }

  deleteFromFavorites(uuid: string): string {
    return this.db.deleteFromFavorites(AppDbField.ALBUMS, uuid);
  }
}
