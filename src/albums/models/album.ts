import { v4 as uuidv4 } from 'uuid';

export class Album {
  readonly id: string; // uuid v4

  constructor(
    public readonly name: string,
    public readonly year: number,
    public readonly artistId: string | null = null,
    private uuid: typeof uuidv4 = uuidv4,
  ) {
    this.id = this.uuid();
  }
}
