import { v4 as uuidv4 } from 'uuid';

export class Track {
  readonly id: string;

  constructor(
    public readonly name: string,
    public readonly duration: number,
    public artistId: string | null = null,
    public albumId: string | null = null,
    private uuid: typeof uuidv4 = uuidv4,
  ) {
    this.id = this.uuid();
  }
}
