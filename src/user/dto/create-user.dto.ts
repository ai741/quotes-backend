import { IsEmail, Length } from 'class-validator';
import { UniqueOnDatabase } from 'src/auth/validations/unique-validation';
import { Unique } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @Length(3, 24)
  username: string;

  @IsEmail()
  email: string;

  @Length(6, 24)
  password?: string;

}
