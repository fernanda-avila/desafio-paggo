"use client";

import { useState } from 'react';
import NavBar from '../navBar/page';
import axios from 'axios';
import { FaRobot } from 'react-icons/fa';
import styles from './upload.module.css';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [huggingFaceExplanation, setHuggingFaceExplanation] = useState<string | null>(null);
  const [isExplanationVisible, setIsExplanationVisible] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
      setProgress(null);
      setFileUrl(null);
      setOcrText(null);
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
      setOcrText(response.data.text);

      setLoading(false);
      setShowModal(true);

      const explanation = response.data.explanation;
      setHuggingFaceExplanation(explanation);

    } catch (error) {
      setError((error as Error).message || 'Erro ao fazer upload do arquivo. Tente novamente.');
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const copyToClipboard = () => {
    if (ocrText) {
      navigator.clipboard.writeText(ocrText);
      alert("Texto copiado para a área de transferência!");
    }
  };

  const toggleExplanationVisibility = () => {
    setIsExplanationVisible(!isExplanationVisible);
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
      </div>

      {showModal && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <div className={styles.modalBody}>
              <img src={fileUrl || ''} alt="Imagem carregada" className={styles.modalImage} />
              <div className={styles.modalText}>
                <h2>Texto Extraído:</h2>
                <p>{ocrText}</p>
                <button onClick={copyToClipboard} className={styles.copyButton}>Copiar Texto</button>
                <div className={styles.huggingFaceIconContainer}>
                  <FaRobot
                    className={styles.huggingFaceIcon}
                    title="Pergunta à IA"
                    onClick={toggleExplanationVisibility}
                  />
                  {isExplanationVisible && huggingFaceExplanation && (
                    <p className={`${styles.explanationText} ${styles.typingEffect}`}>
                      {huggingFaceExplanation}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
