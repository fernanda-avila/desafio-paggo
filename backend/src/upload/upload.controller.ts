import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import * as tesseract from 'tesseract.js'; // Importe o Tesseract.js

// Diretórios de armazenamento
const tempDir = path.resolve(__dirname, '..', 'uploads', 'temp');
const finalDir = path.resolve(__dirname, '..', 'uploads', 'final');

@Controller('uploads')
export class UploadController {

  constructor() {
    // Verifica e cria os diretórios se não existirem
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    if (!fs.existsSync(finalDir)) {
      fs.mkdirSync(finalDir, { recursive: true });
    }
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file', {
    dest: tempDir, // Arquivo vai para o diretório temporário
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('Arquivo não enviado!');
    }

    // Caminho do arquivo carregado
    const finalPath = path.join(finalDir, file.filename);
    // Move o arquivo para o diretório final
    fs.renameSync(file.path, finalPath);

    try {
      // Usando o Tesseract.js para processar o OCR
      const { data: { text } } = await tesseract.recognize(finalPath, 'eng', {
        logger: (m) => console.log(m), // Log do progresso
      });

      return {
        message: 'Arquivo carregado com sucesso',
        filename: file.filename,
        text: text, // Retorna o texto extraído do OCR
      };
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao processar o OCR da imagem.');
    }
  }
}
