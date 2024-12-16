
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HuggingFaceService {
  private readonly apiUrl = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn'; 
  private readonly apiToken = process.env.API_TOKEN;

  private cleanText(text: string): string {
    return text
      .replace(/https?:\/\/[^\s]+/g, '') 
      .replace(/[\d]{2} [A-Z]{3} [\d]{4}/g, '') 
      .replace(/[^a-zA-ZÀ-ÿ\s]/g, '') 
      .replace(/\s+/g, ' ') 
      .trim();
  }

  async explainText(extractedText: string): Promise<string> {
    try {
      const cleanedText = this.cleanText(extractedText);

      const response = await axios.post(
        this.apiUrl,
        {
          inputs: `Explique o significado e o contexto do seguinte texto: "${cleanedText}"`,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json',
          },
          timeout: 100000,
        },
      );

      const explanation = response.data[0]?.summary_text; 
      return explanation || 'Não foi possível gerar uma explicação.';
    } catch (error) {
      console.error('Erro ao chamar a API do Hugging Face:', error);
      throw new Error('Erro ao gerar explicação');
    }
  }
}  