import { IsEmail, IsString, MinLength, IsNotEmpty, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/, {
   message:
    'Password must have at least one number, one lowercase and one uppercase letter, and be at least 6 characters long.',
  })
  password: string;
}
