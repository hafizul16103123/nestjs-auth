import { CurrentUserById } from './decorators/user-by-id.decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Controller, Get, Post, Body, UseGuards, Request, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-guard.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUser(@CurrentUserById() userId:number) {
    return  this.authService.getUser(userId);
  }
  @Post('signin')
  signinLocal(@Body() dto :CreateAuthDto) {
    console.log(dto)
    return this.authService.signinLocal(dto);
  }
  @Post("signup")
  signupLocal(@Body() dto :CreateAuthDto) {
    return this.authService.signupLocal(dto);
  }

}
