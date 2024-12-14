import { Module, forwardRef } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { DocumentModule } from '../documents/documents.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => DocumentModule),
    MulterModule.register({
      dest: './uploads',  
      limits: { fileSize: 10 * 1024 * 1024 }, 
    }),
  ],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
