import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, 24)
  username: string;

  @IsEmail()
  email: string;

  @Length(6, 24)
  password?: string;
}
