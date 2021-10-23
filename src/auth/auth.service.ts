import { User } from './entities/auth.entity';
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
    @InjectModel('User') private UserModel: Model<User>) { }

  async signupLocal(dto: CreateAuthDto) {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    return this.UserModel.create({ ...dto, password: hashedPassword });
  }

  async signinLocal(dto: CreateAuthDto) {
    const user = await this.UserModel.findOne({ email: dto.email }).exec();
    if (!user) throw new UnauthorizedException("Credential incorrect");

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException("Credential incorrect")
    return this.signUser(user.id, user.email, 'user');
  }

  signUser(userId: number, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      claim: type
    }, { expiresIn: '1m' })
  }

  getUser(userId: Number) {
    return userId;
  }


}
