import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import * as tesseract from 'tesseract.js'; 


const tempDir = path.resolve(__dirname, '..', 'uploads', 'temp');
const finalDir = path.resolve(__dirname, '..', 'uploads', 'final');

@Controller('uploads')
export class UploadController {

  constructor() {
   
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    if (!fs.existsSync(finalDir)) {
      fs.mkdirSync(finalDir, { recursive: true });
    }
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    dest: tempDir, 
    limits: { fileSize: 10 * 1024 * 1024 }, 
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Arquivo não enviado!');
    }
 
    const finalPath = path.join(finalDir, file.filename);
   
    fs.renameSync(file.path, finalPath);

    try {
     
      const { data: { text } } = await tesseract.recognize(finalPath, 'eng', {
        logger: (m) => console.log(m), 
      });

      return {
        message: 'Arquivo carregado com sucesso',
        filename: file.filename,
        text: text, 
      };
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao processar o OCR da imagem.');
    }
  }
}
