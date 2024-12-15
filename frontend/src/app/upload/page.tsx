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
  const [fileUrl, setFileUrl] = useState<string | null>(null);  // URL da imagem após o upload
  const [showModal, setShowModal] = useState<boolean>(false);  // Estado para controlar o modal

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
    setFileUrl(null);  // Limpar a URL ao iniciar o upload

    const formData = new FormData();
    formData.append('file', file);  // O 'file' deve ser o mesmo nome do campo no backend
    
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

      // Atualiza o estado com a URL do arquivo
      const filePath = `http://localhost:3001/uploads/image/${response.data.filename}`; // Supondo que o backend retorna o 'filename'
      setFileUrl(filePath);  // Caminho completo da imagem
      setLoading(false);
      setShowModal(true);  // Exibe o modal após o upload

    } catch (error) {
      setError((error as Error).message || 'Erro ao fazer upload do arquivo. Tente novamente.');
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);  // Fecha o modal quando clicado
  };

  return (
    <div>
      {/* NavBar incluída no topo da página */}
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
      </div>

      {/* Modal para mostrar a imagem */}
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
