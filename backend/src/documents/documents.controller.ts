import { Controller, Post, UploadedFile, UseInterceptors, Body, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';
import { UploadService } from '../upload/upload.service';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentService: DocumentsService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handleUpload(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: number,
  ) {
    if (!file) {
      throw new Error('Nenhum arquivo enviado');
    }
    if (!userId) {
      throw new Error('O userId é obrigatório');
    }

    const extractedText = await this.uploadService.extractText(file);
    const explanation = await this.uploadService.getExplanation(extractedText);

    await this.documentService.saveDocument(userId, file, extractedText);

    return { explanation, extractedText };
  }

  @Get()
  async getAllDocuments() {
    return this.documentService.getAllDocuments();
  }

  @Get(':id')
  async getDocument(@Param('id') id: string) {
    const document = await this.documentService.findOne(Number(id));
    if (!document) {
      throw new Error('Documento não encontrado');
    }
    return document;
  }
}
