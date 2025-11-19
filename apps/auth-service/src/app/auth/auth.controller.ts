// apps/auth-service/src/auth/auth.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register' })
  async register(
    @Payload() body: { email: string; name: string; password: string },
  ) {
    return this.authService.register(body.email, body.name, body.password);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @MessagePattern({ cmd: 'get_all_users' })
  getAllUsers(@Payload() data: any) {
    // opcional: você pode usar data.userId para filtrar ou validar
    return this.authService.getAllUsers();
  }

  @MessagePattern({ cmd: 'get_user_by_id' })
  getById(@Payload() data: { id: number }) {
    return this.authService.getUserById(data.id);
  }

}
