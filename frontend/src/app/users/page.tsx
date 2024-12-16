"use client";

import { useState } from 'react';
import axios from 'axios';
import styles from './users.module.css';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    try {
      if (isLoginMode) {
        await axios.post('http://localhost:3001/users/login', { email, password });
        setSuccess('Login bem-sucedido!');
        window.location.href = '/upload'; // Redireciona para /upload após o login bem-sucedido
      } else {
        await axios.post('http://localhost:3001/users', { email, password, name });
        setSuccess('Cadastro bem-sucedido! Agora faça login.');
      }
      setLoading(false);
    } catch (error: any) {
      setError('O login falhou. Verifique suas credenciais.' + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isLoginMode ? 'Login' : 'Cadastro'}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLoginMode && (
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="name">Nome:</label>
            <input
              className={styles.inputField}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="email">Email:</label>
          <input
            className={styles.inputField}
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel} htmlFor="password">Senha:</label>
          <input
            className={styles.inputField}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`${styles.submitButton} ${loading ? styles.submitButtonDisabled : ''}`}
          disabled={loading}
        >
          {loading ? 'Carregando...' : isLoginMode ? 'Entrar' : 'Cadastrar'}
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}
      </form>
      <p className={styles.toggleText}>
        {isLoginMode ? 'Não tem uma conta?' : 'Já tem uma conta?'}
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setIsLoginMode(!isLoginMode)}
        >
          {isLoginMode ? 'Cadastre-se' : 'Faça login'}
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
