import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from '../prisma/prisma.module';

import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [UserModule, PrismaModule, UploadModule],  // Certifique-se de incluir o UploadModule aqui
  providers: [UploadService], 
})
export class AppModule {}
