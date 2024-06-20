'use client';
// src/app/sidebar.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/sidebar.module.css'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.togglebtn} onClick={toggleSidebar}>
      {isOpen ? (
        <span className="close-icon">X</span>
      ) : (
        <span className="open-icon">&#9776;</span>
      )}
      </button>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Iniciar Sesion</Link>
          </li>
          <li>
            <Link href="/signup">Registrarte</Link>
          </li>
          <li>
            <Link href="/prueba">Postulantes</Link>
          </li>
          <li>
            <Link href="/vacancies">Materias</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;