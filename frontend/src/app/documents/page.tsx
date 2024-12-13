"use client";  

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './documents.module.css'; 

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);  

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/documents');
        setDocuments(response.data);  
      } catch (error) {
        console.error('Erro ao buscar documentos', error);
      }
    };

    fetchDocuments();
  }, []);  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Documentos</h1>
      <ul className={styles.list}>
        {documents.map((document) => (
          <li key={document.id} className={styles.listItem}>
            <span className={styles.highlight}>UserId:</span> {document.userId} <br />
            <span className={styles.highlight}>File Path:</span> {document.filePath} <br />
            <span className={styles.highlight}>Texto extraído:</span> {document.extractedText} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
