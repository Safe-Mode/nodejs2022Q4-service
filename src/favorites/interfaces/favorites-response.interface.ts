import { Album } from 'src/albums/models/album';
import { Artist } from 'src/artists/models/artist';
import { Track } from 'src/tracks/models/track';

export interface FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
