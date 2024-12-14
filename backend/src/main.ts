import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

config();  // Carrega as variáveis de ambiente do .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do CORS para permitir acesso ao frontend
  app.enableCors({
    origin: 'http://localhost:3000',  // Permitir requisições do frontend local
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Habilitar validação global com class-validator
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(3001);  // Definindo a porta da aplicação
  console.log('Aplicação rodando em http://localhost:3001');
}

bootstrap();
