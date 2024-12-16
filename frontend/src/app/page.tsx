
import Link from 'next/link';
import styles from '../app/homePage/home.module.css';
import Head from 'next/head';



const HomePage = () => {
  return (
    <>
      <Head>
        <title>imgRead - Home</title>
      </Head>
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>Bem-vindo ao imgRead</h1>
        <p className={styles.description}>O imgRead é um OCR File Reader, e permite que você faça upload de imagens para extrair textos automaticamente.
        </p>
        <Link href="/users">
          <button className={styles.button}>Usar a Plataforma</button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
