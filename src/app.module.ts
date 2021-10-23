import { AuthModule } from './auth/auth.module';
import { Module, } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/configuaration';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    MongooseModule.forRoot(config.mongodbURL),
   ],
  controllers: [],
  providers: []
})
export class AppModule { }