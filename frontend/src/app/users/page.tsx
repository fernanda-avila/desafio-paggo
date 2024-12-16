"use client";

import { useState } from 'react';
import axios from 'axios';
import styles from './users.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);

    const passwordLengthValid = passwordValue.length >= 8;
    const passwordSpecialCharValid = /[!@#*$%^&*(),.?":{}|<>]/.test(passwordValue);
    if (!passwordLengthValid) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres.');
    } else if (!passwordSpecialCharValid) {
      setPasswordError('A senha deve conter pelo menos um caractere especial (!@#*$%^&*).');
    } else {
      setPasswordError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isLoginMode) {
        const response = await axios.post('http://localhost:3001/users/login', { email, password });
        setSuccess('Login bem-sucedido!');
        window.location.href = '/upload'; 
      } else {
        const response = await axios.post('http://localhost:3001/users', { email, password, name });
        setSuccess('Cadastro bem-sucedido! Agora faça login.');
      }
      setLoading(false);
    } catch (error: any) {
      setError('O login falhou. Verifique suas credenciais.' + (error.response?.data?.message || error.message));
      setLoading(false);
    }
  };

  return (
    <div className={styles.container} style={{ backgroundColor: '#2A2C2B' }}> 
      <div className={styles.logoContainer}>
        <img src="/logo.png" alt="Logo" className={styles.logo} /> 
      </div>

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
          <div className={styles.passwordContainer}>
            <input
              className={styles.inputField}
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {passwordError && <p className={styles.passwordError}>{passwordError}</p>} 
        </div>

        <button
          type="submit"
          className={`${styles.submitButton} ${loading ? styles.submitButtonDisabled : ''}`}
          disabled={loading || passwordError !== null}
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
