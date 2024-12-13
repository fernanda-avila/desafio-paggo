import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';
import { UploadService } from '../upload/upload.service';  // Certifique-se de que o UploadService está importado
import * as path from 'path';
import * as fs from 'fs';

@Controller('documents')  // A rota correta para o upload
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,  // Injete o DocumentService
    private readonly uploadService: UploadService,  // Injete o UploadService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))  // 'file' é o nome do campo no FormData
  async handleUpload(
    @UploadedFile() file: Express.Multer.File,  // Recebe o arquivo enviado
    @Body('userId') userId: number,  // Recebe o userId enviado no corpo da requisição
  ) {
    // Verificar se o arquivo e o userId estão presentes
    if (!file) {
      throw new Error('Nenhum arquivo enviado');
    }

    if (!userId) {
      throw new Error('O userId é obrigatório');
    }

    // Verificar a pasta de documentos
    const documentPath = path.join(__dirname, '..', 'documents');
    if (!fs.existsSync(documentPath)) {
      fs.mkdirSync(documentPath, { recursive: true });
    }

    const filePath = path.join(documentPath, file.originalname);
    fs.writeFileSync(filePath, file.buffer);  // Salvar o arquivo no servidor

    const fileUrl = `http://localhost:3001/documents/${file.originalname}`;

    // Processar o OCR (extração do texto)
    const extractedText = await this.uploadService.extractText(file);  // Usando o UploadService

    // Gerar explicação com o LLM (Processamento de linguagem)
    const explanation = await this.uploadService.getExplanation(extractedText);

    // Salvar o documento e a explicação no banco de dados
    await this.documentService.saveDocument(userId, fileUrl, extractedText);

    // Retornar a explicação para o frontend
    return { explanation, filePath: fileUrl };
  }
}
