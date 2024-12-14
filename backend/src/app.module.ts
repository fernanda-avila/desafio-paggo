import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DocumentModule } from './documents/documents.module';
import { PrismaModule } from '../prisma/prisma.module';
import { DocumentsController } from './documents/documents.controller';
import { DocumentsService } from './documents/documents.service';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';  // Certifique-se de importar o UploadModule

@Module({
  imports: [UserModule, DocumentModule, PrismaModule, UploadModule],  // Adicione UploadModule
  controllers: [DocumentsController],
  providers: [DocumentsService, UploadService],  // Providers já estão corretos
})
export class AppModule {}
