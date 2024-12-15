import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as Tesseract from 'tesseract.js';
import * as path from 'path';

@Controller('uploads')
export class ImageUploadController {
  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('Arquivo recebido:', file);

    if (!file) {
      throw new Error('Nenhum arquivo enviado.');
    }

    const imagePath = path.join(__dirname, '..', '..', 'uploads', 'image', file.filename);
    
    // Extração do texto da imagem
    const ocrText = await this.extractTextFromImage(imagePath);

    console.log('Texto extraído:', ocrText); // Exibe o texto extraído do OCR

    return {
      message: 'Arquivo carregado com sucesso',
      filename: file.filename,
      text: ocrText,  // Retorna o texto extraído
    };
  }

  // Função que executa o OCR
  async extractTextFromImage(imagePath: string): Promise<string> {
    try {
      console.log(`Processando a imagem: ${imagePath}`);

      // Executa o Tesseract
      const { data: { text } } = await Tesseract.recognize(
        imagePath,
        'eng', // Ou 'por' se for português
        {
          logger: (m) => console.log(m),  // Log do progresso do OCR
        }
      );

      console.log('Texto extraído do OCR:', text);
      return text;
    } catch (error) {
      console.error('Erro ao processar o OCR:', error);
      throw new Error('Falha ao processar a imagem');
    }
  }
}
