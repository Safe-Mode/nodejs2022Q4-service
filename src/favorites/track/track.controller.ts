import { Controller, Delete, HttpCode, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { TrackService } from "./track.service";

@Controller('favs/track')
export class TrackController {
    constructor(private trackService: TrackService) {}

    @Post(':id')
    addToFavorites(
        @Param('id', ParseUUIDPipe) id: string,
    ) { 
        return this.trackService.addToFavorites(id);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteFromFavorites(@Param('id', ParseUUIDPipe) id: string,) {
        return this.trackService.deleteFromFavorites(id);
    }
}