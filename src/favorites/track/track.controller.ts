import {
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { NO_CONTENT_STATUS_CODE } from 'src/app.const';
import { TrackService } from './track.service';

@Controller('favs/track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Post(':id')
  addToFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.addToFavorites(id);
  }

  @Delete(':id')
  @HttpCode(NO_CONTENT_STATUS_CODE)
  deleteFromFavorites(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.deleteFromFavorites(id);
  }
}
