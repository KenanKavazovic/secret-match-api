import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SetMessageDto {
  @IsString()
  @IsOptional()
  @MaxLength(250)
  message?: string;
}
