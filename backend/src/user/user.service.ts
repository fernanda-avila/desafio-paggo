import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; 

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(email: string, password: string, name: string) {
    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }

  async loginUser(email: string, password: string) {
    
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

   
    if (user.password !== password) {
      throw new Error('Senha incorreta');
    }

    return { message: 'Login bem-sucedido', user };
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
