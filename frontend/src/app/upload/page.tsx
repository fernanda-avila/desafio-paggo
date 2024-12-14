"use client";

import { useState } from 'react';
import NavBar from '../navBar/page';  // Importe o NavBar
import styles from './upload.module.css';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(1);  // Defina o userId conforme necessário
  const [fileUrl, setFileUrl] = useState<string | null>(null);  // Estado para armazenar a URL do arquivo

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
      setProgress(null);
      setFileUrl(null);  // Limpar a URL quando um novo arquivo for selecionado
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor, selecione um arquivo.');
      return;
    }

    setLoading(true);
    setError(null);
    setExplanation(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString());  // Envia o userId corretamente

    try {
      const response = await fetch('http://localhost:3001/documents', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload do documento.');
      }

      const data = await response.json();
      setExplanation(data.explanation);
      setFileUrl(data.filePath);  // Armazenar a URL do arquivo retornada do backend
      setLoading(false);
    } catch (error) {
      setError((error as Error).message || 'Erro ao fazer upload do documento. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div>
      {/* NavBar incluída no topo da página */}
      <NavBar />  
      
      <div className={styles.pageContainer}>
        <div className={styles.uploadContainer}>
          <h1 className={styles.title}>Envie seu Documento</h1>
          <div className={styles.uploadBox}>
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.fileInput}
              accept=".pdf, .png, .jpg, .jpeg"
            />
            <div className={styles.uploadInfo}>
              {file ? (
                <p className={styles.fileName}>Arquivo selecionado: {file.name}</p>
              ) : (
                <p className={styles.filePrompt}>Arraste um arquivo ou clique para selecionar</p>
              )}
            </div>
          </div>
          <button onClick={handleUpload} className={styles.uploadButton} disabled={loading}>
            {loading ? 'Processando...' : 'Enviar Documento'}
          </button>
          {progress !== null && (
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: `${progress}%` }}></div>
            </div>
          )}
          {error && <p className={styles.error}>{error}</p>}
          {explanation && (
            <div className={styles.resultContainer}>
              <h2 className={styles.resultTitle}>Explicação do Documento:</h2>
              <p className={styles.resultText}>{explanation}</p>
            </div>
          )}
          {fileUrl && (
            <div className={styles.fileLinkContainer}>
              <h2 className={styles.resultTitle}>Visualize seu Documento:</h2>
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" className={styles.fileLink}>
                Clique aqui para visualizar o documento
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
