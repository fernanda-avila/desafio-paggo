import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async saveDocument(userId: number, file: Express.Multer.File, extractedText: string) {

    return this.prisma.document.create({
      data: {
        userId,
        filePath: file.originalname,  
        extractedText,
        file_data: file.buffer, 
      },
    });
  }

  async getAllDocuments() {
    return this.prisma.document.findMany();
  }

  async findOne(id: number) {
    return this.prisma.document.findUnique({
      where: { id },
    });
  }
}
