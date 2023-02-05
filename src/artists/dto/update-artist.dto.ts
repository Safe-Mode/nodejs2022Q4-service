import { Optional } from '@nestjs/common';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateArtistDto {
  @Optional()
  @IsString()
  name: string;

  @Optional()
  @IsBoolean()
  grammy: boolean;
}
