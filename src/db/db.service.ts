import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../albums/dto/create-album.dto';
import { Album } from '../albums/models/album';
import { CreateArtistDto } from '../artists/dto/create-artist.dto';
import { Artist } from '../artists/models/artist';
import { Favorites } from '../favorites/models/favorites';
import { Track } from '../tracks/models/track';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { User } from '../users/models/user';

type Entity = User | Artist | Album | Track;

export enum AppDbField {
  USERS = 'users',
  ARTISTS = 'artists',
  ALBUMS = 'albums',
  TRACKS = 'tracks',
  FAVS = 'favorites'
}

@Injectable()
export class DbService {
  private users: User[] = [];
  private artists: Artist[] = [];
  private albums: Album[] = [];
  private tracks: Track[] = [];
  private favorites: Favorites = new Favorites();

  getAll(fieldName: Exclude<AppDbField, AppDbField.FAVS>): Entity[] {
    return this[fieldName];
  }

  getById(fieldName: Exclude<AppDbField, AppDbField.FAVS>, id: string): Entity {
    return (this[fieldName] as Entity[]).find((entity) => entity.id === id);
  }

  createUser({ login, password }: CreateUserDto): UserResponseDto {
    const user = new User(login, password);
    this.users.push(user);

    const userResponse = { ...user };
    delete userResponse.password;

    return userResponse;
  }

  createArtist({ name, grammy }: CreateArtistDto): Artist {
    const artist = new Artist(name, grammy);
    this.artists.push(artist);
    return artist;
  }

  createAlbum({ name, year, artistId }: CreateAlbumDto): Album {
    const album = new Album(name, year, artistId);
    this.albums.push(album);
    return album;
  }

  createTrack({ name, duration }: Partial<Track>): Track {
    const track = new Track(name, duration);
    this.tracks.push(track);
    return track;
  }

  update(fieldName: Exclude<AppDbField, AppDbField.FAVS>, id: string, data: Partial<Entity>): Entity {
    const entity = this.getById(fieldName, id);

    if (entity) {
      for (let field in data) {
        entity[field] = data[field];
      }

      if (entity instanceof User) {
        entity.version++;
        entity.updatedAt = Date.now();
      }
    }

    return entity;
  }

  delete(fieldName: Exclude<AppDbField, AppDbField.FAVS>, id: string): Entity {
    const entityIndex = this[fieldName].findIndex((entity) => entity.id === id);
    return entityIndex !== -1
      ? this[fieldName].splice(entityIndex, 1)[0]
      : undefined;
  }

  getFavorites(): Favorites {
    return this.favorites;
  }

  addToFavorites(fieldName: AppDbField, id: string) {
    return this.favorites[fieldName].push(id);
  }

  deleteFromFavorites(fieldName: AppDbField, id: string) {
    const index = this.favorites[fieldName].indexOf(id);
    return index !== -1 ? this.favorites[fieldName].splice(index, 1)[0] : undefined;
  }
}
