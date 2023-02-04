import { Injectable } from '@nestjs/common';
import { Track } from './tracks/models/track';
import { CreateUserDto } from './users/dto/create-user.dto';
import { User } from './users/models/user';

@Injectable()
export class AppDB {
  private users: User[] = [];
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

  createTrack({ name, duration }: Partial<Track>): Track {
    const track = new Track(name, duration);
    this.tracks.push(track);
    return track;
  }

  updateUser(id: string, data: Partial<User>): User {
    const user = this.getById<User>('users', id);

    for (let field in data) {
      user[field] = data[field];
    }

    return user;
  }

  updateTrack(id: string, data: Partial<Track>): Track {
    const track = this.getById<Track>('tracks', id);

    for (let field in data) {
      track[field] = data[field];
    }

    return track;
  }

  delete(fieldName: string, id: string): void {
    this[fieldName].splice(
      this[fieldName].findIndex((entity) => entity.id === id),
      1,
    );
  }
}
