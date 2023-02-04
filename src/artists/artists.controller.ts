import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './models/artist';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getAll(): Artist[] {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string): Artist {
    return this.artistsService.getById(id);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: Partial<CreateArtistDto>,
  ): Artist {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string): void {
    this.artistsService.delete(id);
    return null;
  }
}
