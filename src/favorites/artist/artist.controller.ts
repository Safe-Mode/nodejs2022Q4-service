import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ArtistService } from './artist.service';

@Controller('favs/artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Post(':id')
  addToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.addToFavorites(id);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.deleteFromFavorites(id);
  }
}
