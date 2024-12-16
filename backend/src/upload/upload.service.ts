import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';  

@Injectable()
export class UploadService {
  async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
    try {
      console.log("Iniciando o reconhecimento de texto na imagem...");
      const { data: { text } } = await Tesseract.recognize(
        imageBuffer,
        'por',  
        {
          logger: (m) => console.log(m), 
        }
      );
      console.log("Texto extraído:", text);
      return text;
    } catch (error) {
      console.error('Erro ao extrair texto da imagem:', error);
      throw new Error('Erro ao extrair texto da imagem');
    }
  }
}
