import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as Tesseract from 'tesseract.js';


@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}


  async extractText(file: Express.Multer.File): Promise<string> {
    const result = await Tesseract.recognize(file.buffer, 'eng');
    return result.data.text;
  }


  async getExplanation(text: string): Promise<string> {


    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer SEU_TOKEN_API_OPENAI`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        prompt: `Explique o seguinte texto: "${text}"`,
        max_tokens: 300,
      }),
    });


    const data = await response.json();
    return data.choices[0].text.trim();
  }


 
  async saveDocument(userId: number, filePath: string, extractedText: string): Promise<void> {
    await this.prisma.document.create({
      data: {
        userId,
        filePath,  
        extractedText,
      },
    });
  }
}  
