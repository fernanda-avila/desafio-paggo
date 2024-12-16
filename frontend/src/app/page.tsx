// app/page.tsx
import Link from 'next/link';
import styles from '../app/homePage/home.module.css';

const HomePage = () => {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Bem-vindo ao imgRead</h1>
      <p className={styles.description}>O imgRead é um OCR File Reader, e permite que você faça upload de imagens para extrair textos automaticamente.
      Basta enviar um arquivo e nós cuidamos do resto.</p>
      <Link href="/users">
        <button className={styles.button}>Usar a Plataforma</button>
      </Link>
    </div>
  );
};

export default HomePage;
