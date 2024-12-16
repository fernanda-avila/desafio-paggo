import { Module } from '@nestjs/common';
import { ImageUploadController } from './upload/image-upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { ImageController } from './upload/image.controller';
import { existsSync, mkdirSync } from 'fs';

// Garantir que a pasta 'uploads/image' exista
const uploadDir = join(__dirname, '..', 'uploads', 'image');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: uploadDir,  // Garantir que a pasta 'uploads/image' existe
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, uniqueSuffix + '-' + file.originalname);  // Nome único para cada arquivo
        },
      }),
    }),
  ],
  controllers: [
    ImageUploadController,  
    ImageController,        
  ],
})
export class AppModule {}
