import { Album } from 'src/albums/models/album';
import { Artist } from 'src/artists/models/artist';
import { Track } from 'src/tracks/models/track';

export class FavoritesResponseDto {
  constructor(
    readonly artists: Omit<Artist, 'uuid'>[] = [],
    readonly albums: Omit<Album, 'uuid'>[] = [],
    readonly tracks: Omit<Track, 'uuid'>[] = [],
  ) {}
}
