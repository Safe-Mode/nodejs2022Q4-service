import { v4 as uuidv4 } from 'uuid';

export class Artist {
  readonly id: string;

  constructor(
    public readonly name: string,
    public readonly grammy: boolean,
    private uuid: typeof uuidv4 = uuidv4,
  ) {
    this.id = this.uuid();
  }
}
