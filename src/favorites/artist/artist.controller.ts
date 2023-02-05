import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { NO_CONTENT_STATUS_CODE } from 'src/app.const';
import { ArtistService } from './artist.service';

@Controller('favs/artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Post(':id')
  addToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.addToFavorites(id);
  }

  @Delete(':id')
  @HttpCode(NO_CONTENT_STATUS_CODE)
  deleteFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.deleteFromFavorites(id);
  }
}
