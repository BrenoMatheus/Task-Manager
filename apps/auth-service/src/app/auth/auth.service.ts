// apps/auth-service/src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, name: string, password: string) {
    const user = await this.usersService.create({ email, name, password });
    // publicando evento no RabbitMQ pode ser adicionado aqui
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),

      // Retorna dados úteis do usuário para o frontend
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }


  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  async getUserById(id:number) {
    return this.usersService.getUserById(id);
  }
  
}
