import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

import { ImageUploadController } from './upload/image-upload.controller';
import { ImageController } from './upload/image.controller';
import { UserModule } from './user/user.module';
import { HuggingFaceService } from './hugging-face/hugging-face.service'; 

const uploadDir = join(__dirname, '..', 'uploads', 'image');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true });
}

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: uploadDir,
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '-' + file.originalname); 
        },
      }),
    }),
    UserModule,
  ],
  controllers: [
    ImageUploadController, 
    ImageController,     
  ],
  providers: [
    HuggingFaceService,  
  ],
})
export class AppModule {}