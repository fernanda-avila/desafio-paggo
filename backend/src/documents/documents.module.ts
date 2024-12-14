import { Module, forwardRef } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UploadModule } from '../upload/upload.module';  

@Module({
  imports: [
    PrismaModule, 
    forwardRef(() => UploadModule), 
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService],  
})
export class DocumentModule {}
