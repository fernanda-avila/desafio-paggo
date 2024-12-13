import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UploadService {
  private gptApiKey = process.env.OPENAI_API_KEY;  // Certifique-se de que a chave está no seu .env

  async extractText(file: Express.Multer.File): Promise<string> {
    // Função de OCR (como no exemplo acima)
    // Retorne um texto extraído fictício para evitar erro de compilação
    return 'Texto extraído fictício';
  }

  async getExplanation(extractedText: string): Promise<string> {
    const prompt = `Explique o seguinte texto extraído de um documento: ${extractedText}`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'gpt-4',  // Ou o modelo de sua escolha
          prompt: prompt,
          max_tokens: 500,  // Limite de tokens na resposta
        },
        {
          headers: {
            Authorization: `Bearer ${this.gptApiKey}`,  // Chave de API da OpenAI
            'Content-Type': 'application/json',
          },
        },
      );

      const explanation = response.data.choices[0].text.trim();
      console.log('Explicação do GPT:', explanation);  // Log da explicação
      return explanation;
    } catch (error) {
      console.error('Erro ao obter explicação do GPT:', error);
      throw new Error('Erro ao obter explicação do GPT');
    }
  }
}
