import { Controller, Get } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { Favorites } from "./models/favorites";

@Controller('favs')
export class FavoritesController {
    constructor(private favsService: FavoritesService) {}

    @Get()
    getAll(): Favorites {
        return this.favsService.getAll();
    }
};