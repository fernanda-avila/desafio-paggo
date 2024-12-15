import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadController } from './upload-controller';  // Corrija o nome se necessário
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      dest: './uploads',  // Destino para onde os arquivos serão enviados
      limits: { fileSize: 10 * 1024 * 1024 },  // Limite de tamanho do arquivo (10MB)
    }),
  ],
  providers: [UploadService],
  controllers: [UploadController],  // Certifique-se de que o controlador está sendo importado
})
export class UploadModule {}
