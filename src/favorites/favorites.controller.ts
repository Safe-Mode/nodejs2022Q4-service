import { Controller, Get } from '@nestjs/common';
import { FavoritesResponseDto } from './dto/favorites-response.dto';
import { FavoritesService } from './favorites.service';
import { Favorites } from './models/favorites';

@Controller('favs')
export class FavoritesController {
  constructor(private favsService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favsService.getAll();
  }
}
