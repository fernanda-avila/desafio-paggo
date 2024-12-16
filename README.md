# 🖼️ ImgRead - Desafio Paggo

Este repositório contém uma aplicação full-stack desenvolvida como parte do **Desafio Paggo**

## 🛠️ Tecnologias Utilizadas
- **Next.js**: Para a construção de interfaces de usuário rápidas e otimizadas
- **NestJS**: Para criar um backend modular, escalável e de alto desempenho
- **Prisma**: Para gerenciamento e interação com o banco de dados MySQL
- **MySQL**: Banco de dados relacional para armazenar informações
- **Tesseract.js**: Para reconhecimento óptico de caracteres (OCR), extraindo texto de imagens

## ⚙️ Funcionalidades
- Integração entre frontend e backend
- Processamento de imagens para extração de texto usando Tesseract.js
- Gerenciamento de dados com MySQL e Prisma
- API para interagir com o banco de dados
- Interface de usuário dinâmica com Next.js
  
## 💡 Experiência de Desenvolvimento
Durante os 5 dias de desenvolvimento deste projeto, alguns desafios e aprendizagens foram particularmente marcantes para mim:

- **Primeira Experiência com NestJS e Prisma**: Nunca havia trabalhado com NestJS ou Prisma antes, o que tornou o aprendizado dessas ferramentas uma das partes mais desafiadoras e enriquecedoras do projeto.
- **OCR na Prática**: Embora já tivesse conhecimento teórico sobre OCR, foi a primeira vez que integrei uma ferramenta de OCR, o Tesseract.js, em um projeto. A experiência prática me ajudou a entender melhor essa tecnologia.
- **Conhecimento Prévio com Next.js e Express**: Ter familiaridade com Next.js e Express foi um ponto de apoio importante para lidar com as demandas do projeto, mas a aplicação prática em uma arquitetura robusta trouxe novos aprendizados.
- **Gerenciamento de Dados com Prisma**: A utilização do Prisma como ORM facilitou a manipulação e interação com o banco de dados, mas exigiu atenção especial à modelagem e migração das tabelas para garantir a integridade e a eficiência dos dados.

---

## 🚀 Como Iniciar

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/) e npm
- MySQL
- Biblioteca Tesseract.js (instalada como dependência do projeto)

### Instalação

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/fernanda-avila/desafio-paggo.git
    cd desafio-paggo
    ```

2. **Instale as dependências** do backend e do frontend:

    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

3. **Crie o banco de dados MySQL**:

    ```sql
    CREATE DATABASE paggo_ocr;
    ```

4. **Configure a URL do banco de dados** no arquivo `.env` do backend:

    Crie um arquivo `.env` dentro da pasta `backend` e adicione a seguinte linha, substituindo `YOUR_PASSWORD` pela senha do seu banco MySQL:

    ```env
    DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/paggo_ocr"
    ```

---

### 🖥️ Executando o Backend

1. **Aplique as migrações do Prisma** para criar as tabelas no banco de dados:

    ```bash
    cd backend
    npx prisma migrate dev --name init
    ```

2. **Inicie o servidor backend**:

    ```bash
    npm run start:dev
    ```

### 🌐 Executando o Frontend

1. **Inicie o servidor frontend**:

    ```bash
    cd frontend
    npm run dev
    ```

2. **Acesse a aplicação** no navegador:

    [http://localhost:3000](http://localhost:3000/)

---

## 📂 Estrutura do Projeto

- **backend/**: Contém a API desenvolvida com NestJS e o ORM Prisma
- **frontend/**: Contém a interface de usuário construída com Next.js
- **prisma/**: Arquivos de configuração e migração do Prisma
- **OCR (Tesseract.js)**: Integração no backend para processar imagens e extrair texto

---

## 📋 Notas Importantes

- Certifique-se de que o MySQL esteja rodando localmente e configurado corretamente.
- Use a mesma URL do banco de dados configurada no arquivo `.env` no backend.
- O Tesseract.js é executado diretamente no backend para processar imagens recebidas pela API.

---
<p align="center">
  Desenvolvido por Fernanda Ávila 💖
</p>
