"use client";

import { useRouter } from "next/router";
import styles from './home.module.css';

const HomePage = () => {
  const router = useRouter();

  const navigateToUpload = () => {
    router.push('/upload'); // Redireciona para a página de upload de arquivos
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Bem-vindo ao OCR File Upload</h1>
        <p className={styles.description}>
          Nossa plataforma permite que você faça upload de imagens para extrair textos automaticamente.
          Basta enviar um arquivo e nós cuidamos do resto.
        </p>
        <button className={styles.button} onClick={navigateToUpload}>
          Usar a Plataforma
        </button>
      </div>
    </div>
  );
};

export default HomePage;
