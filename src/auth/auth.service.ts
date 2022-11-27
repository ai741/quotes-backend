import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneCond({
      email,
      password,
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateJwtToken(data: {id: number; email: string}){
    const payload = { email: data.email, sub: data.id };
    return this.jwtService.sign(payload)
  };

  async login(user: UserEntity) {
    const { password, ...userData } = user;
    const payload = { email: user.email, sub: user.id };
    return {
      ...user,
      token: this.generateJwtToken(userData),
    };
  }

  async register(dto: CreateUserDto) {
    try{
      const {password, ...user} = await this.usersService.create(dto);
      return {
        ...user,
        token: this.generateJwtToken(user),
      };
    } catch(e){ 
      throw new ForbiddenException("Ошбика при регистрации")
    }

  }
}
