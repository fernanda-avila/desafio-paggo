import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) {}

  // Método para salvar o documento no banco de dados
  async saveDocument(userId: number, filePath: string, extractedText: string) {
    return this.prisma.document.create({
      data: {
        userId,
        filePath,
        extractedText,
      },
    });
  }

  // Método para obter todos os documentos de todos os usuários
  async getAllDocuments() {
    return this.prisma.document.findMany();
  }
}
