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
import { Artist } from '@prisma/client';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  getAll(): Promise<Artist[]> {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return this.artistsService.getById(id);
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<Artist> {
    return this.artistsService.delete(id);
  }
}
