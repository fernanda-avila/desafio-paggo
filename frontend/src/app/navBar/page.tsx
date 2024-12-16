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
            src="/logo.png"
            alt="Logo"
            width={70}
            height={70}
          />
        </a>
      </div>
  
      {isLoggedIn && (
        <button className={styles.logoutButton} onClick={handleLogout}>
          <FiLogOut size={24} color="#76a9fa" />
        </button>
      )}
    </nav>
  );
}
