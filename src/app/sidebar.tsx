"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "@/app/sidebar.module.css";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/classNames";

const links = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Iniciar Sesion" },
  { href: "/signup", label: "Registrarte" },
  { href: "/prueba", label: "Postulantes" },
  { href: "/vacancies", label: "Vacantes " },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.togglebtn} onClick={toggleSidebar}>
        {isOpen ? (
          <span className="close-icon">X</span>
        ) : (
          <span className="open-icon">&#9776;</span>
        )}
      </button>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  styles.link,
                  pathname === link.href && "font-bold"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
