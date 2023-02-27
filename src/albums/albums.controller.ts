import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Album } from '@prisma/client';
import { NO_CONTENT_STATUS_CODE } from 'src/app.const';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  getAll(): Promise<Album[]> {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return this.albumsService.getById(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(NO_CONTENT_STATUS_CODE)
  delete(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return this.albumsService.delete(id);
  }
}
