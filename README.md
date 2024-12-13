# desafio-paggo

1. npm install em /backend e em /frontend
2. criei o schema no meu mysql ``CREATE DATABASE paggo_ocr;``
3. alterar a ``DATABASE_URL`` no .env: ``DATABASE_URL="mysql://root:SENHABD@localhost:3306/paggo_ocr"``
4.`npx prisma migrate dev --name init`` - no backend
5.``npm run start:dev`` - no backend
6.``npm run dev`` - no frontend