import { Module } from "@nestjs/common";
import { FavoritesController } from "./favorites.controller";
import { FavoritesService } from "./favorites.service";
import { TrackModule } from "./track/track.module";

@Module({
    imports: [TrackModule],
    controllers: [FavoritesController],
    providers: [FavoritesService]
})
export class FavoritesModule {};