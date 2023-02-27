import { Controller, Get } from '@nestjs/common';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favsService: FavoritesService) {}

  @Get()
  getAll(): Promise<FavoritesResponseDto> {
    return this.favsService.getAll();
  }
}
