import { v4 as uuidv4 } from 'uuid';

export class User {
  readonly id: string;
  readonly createdAt: number;

  updatedAt: number;
  version: number;

  constructor(
    public readonly login: string,
    public password: string,
    private uuid: typeof uuidv4 = uuidv4,
  ) {
    this.id = this.uuid();
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = this.createdAt;
  }
}
