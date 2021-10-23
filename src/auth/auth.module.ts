import { UserSchema } from './entities/auth.entity';
import { JwtStrategy } from './strategy/jwt-strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';



@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),JwtModule.register({secret:"super-secret-cat"})],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
