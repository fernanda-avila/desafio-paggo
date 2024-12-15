"use client";

import { useState } from 'react';
import NavBar from '../navBar/page'; 
import axios from 'axios';  
import styles from './upload.module.css';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);  
  const [ocrText, setOcrText] = useState<string | null>(null);  // Estado para armazenar o texto extraído
  const [showModal, setShowModal] = useState<boolean>(false);  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
      setProgress(null);
      setFileUrl(null);  
      setOcrText(null);  // Limpa o texto OCR quando um novo arquivo for selecionado
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor, selecione um arquivo.');
      return;
    }

    setLoading(true);
    setError(null);
    setFileUrl(null);  

    const formData = new FormData();
    formData.append('file', file);  
    
    try {
      const response = await axios.post('http://localhost:3001/uploads/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  
        },
        onUploadProgress: (progressEvent: any) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);  
          }
        },
      });

      const filePath = `http://localhost:3001/uploads/image/${response.data.filename}`; 
      setFileUrl(filePath);  
      setOcrText(response.data.text);  // Atualiza o estado com o texto extraído
      setLoading(false);
      setShowModal(true);  

    } catch (error) {
      setError((error as Error).message || 'Erro ao fazer upload do arquivo. Tente novamente.');
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);  
  };

  return (
    <div>
      <NavBar />  
      
      <div className={styles.pageContainer}>
        <div className={styles.uploadContainer}>
          <h1 className={styles.title}>Envie seu Arquivo</h1>
          <div className={styles.uploadBox}>
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.fileInput}
              accept=".png, .jpg, .jpeg"
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
            {loading ? 'Processando...' : 'Enviar Arquivo'}
          </button>
          {progress !== null && (
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: `${progress}%` }}></div>
            </div>
          )}
          {error && <p className={styles.error}>{error}</p>}
        </div>
        
        {/* Exibindo o texto OCR se disponível */}
        {ocrText && (
          <div className={styles.ocrResult}>
            <h2>Texto Extraído:</h2>
            <p>{ocrText}</p>
          </div>
        )}
      </div>

      {showModal && fileUrl && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent}>
            <span className={styles.close}>&times;</span>
            <img src={fileUrl} alt="Imagem carregada" className={styles.modalImage} />
          </div>
        </div>
      )}
    </div>
  );
}
