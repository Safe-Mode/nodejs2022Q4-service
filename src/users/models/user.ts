import { v4 as uuidv4 } from 'uuid';

export class User {
  readonly id: string; // uuid v4
  readonly version: number; // integer number, increments on update
  readonly createdAt: number; // timestamp of creation
  readonly updatedAt: number; // timestamp of last update

  constructor(
    public readonly login: string,
    public password: string,
    private uuid: typeof uuidv4 = uuidv4,
  ) {
    this.id = this.uuid();
    this.version = 0;
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }
}
