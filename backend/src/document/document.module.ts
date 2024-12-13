import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { PrismaModule } from '../../prisma/prisma.module';  // Certifique-se de que o PrismaModule está importado
import { UploadModule } from '../upload/upload.module';  // Importe o UploadModule aqui

@Module({
  imports: [PrismaModule, UploadModule],  // Importando o UploadModule
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
