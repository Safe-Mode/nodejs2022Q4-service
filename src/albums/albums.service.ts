import { Injectable } from '@nestjs/common';
import { AppDB, AppDbField } from 'src/app.db';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './models/album';

@Injectable()
export class AlbumsService {
  constructor(private db: AppDB) {}

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
    return this.db.delete(AppDbField.ALBUMS, uuid) as Album;
  }
}
