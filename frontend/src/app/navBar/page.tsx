import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import Image from 'next/image';
import styles from './navBar.module.css';

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/users';
  };

  return (
    <nav className={styles.navBar}>
      <div className={styles.logo}>
        <a href="/">
          <Image
            src="logo.png"
            alt="Logo"
            width={50}
            height={50}
          />
        </a>
      </div>
      <div className={styles.navLinks}>
        <a href="/" className={styles.navLink}>Home</a>
        <a href="/sobre" className={styles.navLink}>Sobre</a>
        <a href="/contato" className={styles.navLink}>Contato</a>
      </div>
      {isLoggedIn && (
        <button className={styles.logoutButton} onClick={handleLogout}>
          <FiLogOut size={24} color="#76a9fa" />
        </button>
      )}
    </nav>
  );
}
