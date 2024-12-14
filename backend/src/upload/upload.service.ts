import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as Tesseract from 'tesseract.js'; 

@Injectable()
export class UploadService {
  private huggingFaceApiKey = process.env.HUGGING_FACE_API_KEY;  

  async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
    try {
      const { data: { text } } = await Tesseract.recognize(imageBuffer, 'eng');
      return text;
    } catch (error) {
      console.error('Erro ao extrair texto da imagem:', error);
      throw new Error('Erro ao extrair texto da imagem');
    }
  }  

  async extractText(file: Express.Multer.File): Promise<string> {
    return 'Texto extraído fictício';
  }

  async getExplanation(extractedText: string): Promise<string> {
    const prompt = `Explique o seguinte texto extraído de um documento: ${extractedText}`;

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/gpt2',  
        {
          inputs: prompt,  
        },
        {
          headers: {
            Authorization: `Bearer ${this.huggingFaceApiKey}`, 
            'Content-Type': 'application/json',
          },
        },
      );

      const explanation = response.data[0]?.generated_text?.trim();

      if (!explanation) {
        throw new Error('Não foi possível obter a explicação.');
      }

      console.log('Explicação:', explanation);  
      return explanation;
    } catch (error) {
      console.error('Erro ao obter explicação:', error);
      throw new Error('Erro ao obter explicação');
    }
  }
}
