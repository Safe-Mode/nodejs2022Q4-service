import { Injectable } from "@nestjs/common";
import { AppDbField, DbService } from "src/db/db.service";
import { Favorites } from "./models/favorites";

@Injectable()
export class FavoritesService {
    constructor(private db: DbService) {}

    getAll(): Favorites {
        return this.db.getFavorites();
    }
};