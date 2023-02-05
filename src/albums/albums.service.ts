import { Injectable } from '@nestjs/common';
import { AppDbField, DbService } from 'src/db/db.service';
import { Track } from 'src/tracks/models/track';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './models/album';

@Injectable()
export class AlbumsService {
  constructor(private db: DbService) {}

  getAll(): Album[] {
    return this.db.getAll(AppDbField.ALBUMS) as Album[];
  }

  getById(uuid: string): Album {
    return this.db.getById(AppDbField.ALBUMS, uuid) as Album;
  }

  create(data: CreateAlbumDto): Album {
    return this.db.createAlbum(data);
  }

  update(uuid: string, data: UpdateAlbumDto): Album {
    return this.db.update(AppDbField.ALBUMS, uuid, data) as Album;
  }

  delete(uuid: string): Album {
    const album = this.db.delete(AppDbField.ALBUMS, uuid) as Album;

    if (album) {
      const relatedTrack = (this.db.getAll(AppDbField.TRACKS) as Track[]).find(
        ({ albumId }) => albumId === uuid,
      );
      this.db.update(AppDbField.TRACKS, relatedTrack?.id, { albumId: null });
    }

    return album;
  }
}
