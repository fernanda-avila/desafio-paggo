import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Certifique-se de que o caminho está certo

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
    // Verifica se o usuário existe com esse email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica se a senha está correta (se necessário, você pode fazer uma verificação de senha com hash)
    if (user.password !== password) {
      throw new Error('Senha incorreta');
    }

    return { message: 'Login bem-sucedido', user };
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
