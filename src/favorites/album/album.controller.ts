import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { Album } from 'src/albums/models/album';
import { AlbumService } from './album.service';

@Controller('favs/album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Post(':id')
  addToFavorites(@Param('id', ParseUUIDPipe) id: string): Album {
    return this.albumService.addToFavorites(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteFromFavorites(@Param('id', ParseUUIDPipe) id: string): string {
    return this.albumService.deleteFromFavorites(id);
  }
}
