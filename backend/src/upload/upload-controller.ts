import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))  
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Arquivo não enviado');
    }

    try {
      const extractedText = await this.uploadService.extractTextFromImage(file.buffer);
      const explanation = await this.uploadService.getExplanation(extractedText);
      return { extractedText, explanation };
    } catch (error) {
      throw new BadRequestException('Erro ao processar o arquivo');
    }
  }
}
