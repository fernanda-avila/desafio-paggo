import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class ImageUploadController {
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);  // Exibe o arquivo que foi carregado
    return { message: 'Arquivo carregado com sucesso', filename: file.filename };
  }
}
