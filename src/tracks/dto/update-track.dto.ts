import { IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  name: string;

  @IsOptional()
  duration?: number;

  @IsOptional()
  artistId?: string | null;

  @IsOptional()
  albumId?: string | null;
}
