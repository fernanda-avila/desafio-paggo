import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('uploads')
export class ImageController {
  @Get('image/:imgpath')
  getImage(@Param('imgpath') image: string, @Res() res: Response) {
    // Ajuste o caminho para o diretório correto onde as imagens estão
    return res.sendFile(join(__dirname, '..', '..', 'uploads', 'image', image)); // Caminho correto
  }
}
