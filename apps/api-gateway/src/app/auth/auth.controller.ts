import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Post('login')
  async login(@Body() body: any) {
    return this.client.send({ cmd: 'login' }, body);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.client.send({ cmd: 'register' }, body);
  }

  @Get('users')
  async getAllUsers() {
    return this.client.send({ cmd: 'get_all_users' }, {});
  }

}
