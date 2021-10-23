import { User } from './entities/auth.entity';
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import users from 'src/auth/data/users';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel('User') private UserModel: Model<User>) { }
  async signinLocal(dto: CreateAuthDto) {
    const user = await this.UserModel.findOne({email: dto.email}).exec();
    if (!user) throw new UnauthorizedException("Credential incorrect")
    if (user.password !== dto.password) throw new UnauthorizedException("Credential incorrect")
    return this.signUser(user.id, user.email, 'user');
  }
  getUser(userId: Number) {
    console.log(this.configService.get('port'))
    console.log(this.configService.get('database.host'))
    console.log(this.configService.get('database.port'))
    return userId;
  }
  signUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      claim: type
    })
  }
  signupLocal(dto: CreateAuthDto) {
    console.log({ dto })
    return this.UserModel.create(dto);
  }

}
