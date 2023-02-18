import { Album } from "src/albums/models/album";
import { Artist } from "src/artists/models/artist";
import { Track } from "src/tracks/models/track";

export class FavoritesResponseDto {
  constructor(
    readonly artists: Artist[] = [],
    readonly albums: Album[] = [],
    readonly tracks: Track[] = [],
  ) {}
}
