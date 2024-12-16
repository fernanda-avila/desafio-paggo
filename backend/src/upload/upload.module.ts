import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';  
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      dest: './uploads',
      limits: { fileSize: 10 * 1024 * 1024 },  
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],  
})
export class UploadModule {}
