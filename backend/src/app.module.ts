import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';  
import { DocumentModule } from './document/document.module';  
import { PrismaModule } from '../prisma/prisma.module';  

@Module({
  imports: [UserModule, DocumentModule, PrismaModule], 
  controllers: [],
  providers: [],
})
export class AppModule {}
