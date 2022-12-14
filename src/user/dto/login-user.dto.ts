import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @Length(6, 24)
  password?: string;
}
