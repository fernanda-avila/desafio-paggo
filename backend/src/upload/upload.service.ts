import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';  // Importando o Tesseract.js

@Injectable()
export class UploadService {
  async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
    try {
      console.log("Iniciando o reconhecimento de texto na imagem...");
      const { data: { text } } = await Tesseract.recognize(
        imageBuffer,
        'por',  // Certifique-se de ter o idioma correto
        {
          logger: (m) => console.log(m),  // Log detalhado para progressão
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
