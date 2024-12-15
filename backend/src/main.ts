import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

config();  // Carrega variáveis de ambiente do .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração de CORS, permitindo que a origem seja configurada a partir das variáveis de ambiente
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';  // A URL pode ser configurada no .env
  app.enableCors({
    origin: frontendUrl,  // Agora você pode configurar a URL diretamente no .env
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Validação global para os dados recebidos
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Configuração da porta a partir de uma variável de ambiente
  const port = process.env.PORT || 3001;  // Usa a variável de ambiente ou 3001 como padrão
  await app.listen(port);
  console.log(`Aplicação rodando em http://localhost:${port}`);
}

bootstrap();
