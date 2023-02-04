import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './artists/dto/create-artist.dto';
import { Artist } from './artists/models/artist';
import { Track } from './tracks/models/track';
import { CreateUserDto } from './users/dto/create-user.dto';
import { User } from './users/models/user';

export enum AppDbField {
  USERS = 'users',
  ARTISTS = 'artists',
  TRACKS = 'tracks',
}

@Injectable()
export class AppDB {
  private users: User[] = [];
  private artists: Artist[] = [];
  private tracks: Track[] = [];

  getAll<Entity>(fieldName: string): Entity[] {
    return this[fieldName];
  }

  getById<Entity>(fieldName: string, id: string): Entity {
    return this[fieldName].find((entity) => entity.id === id);
  }

  createUser({ login, password }: CreateUserDto): User {
    const user = new User(login, password);
    this.users.push(user);
    return user;
  }

  createArtist({ name, grammy }: CreateArtistDto): Artist {
    const artist = new Artist(name, grammy);
    this.artists.push(artist);
    return artist;
  }

  createTrack({ name, duration }: Partial<Track>): Track {
    const track = new Track(name, duration);
    this.tracks.push(track);
    return track;
  }

  update<Entity>(
    fieldName: AppDbField,
    id: string,
    data: Partial<Entity>,
  ): Entity {
    const entity = this.getById<Entity>(fieldName, id);

    if (entity) {
      for (let field in data) {
        entity[field] = data[field];
      }
    }

    return entity;
  }

  delete(fieldName: string, id: string): void {
    this[fieldName].splice(
      this[fieldName].findIndex((entity) => entity.id === id),
      1,
    );
  }
}
