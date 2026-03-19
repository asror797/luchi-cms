"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/listen", label: "Listen" },
  { href: "/library", label: "Breastie Library" },
  { href: "/programs", label: "Wellness Programs" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isWorkWithMe = pathname === "/work-with-me";

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.navLogo}>
        Diary of <span>A Breastie</span>
      </Link>

      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={pathname === link.href ? styles.active : ""}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
        {menuOpen && (
          <li>
            <Link
              href="/work-with-me"
              className={styles.menuCta}
              onClick={() => setMenuOpen(false)}
            >
              Work With Me
            </Link>
          </li>
        )}
      </ul>

      <div className={styles.navRight}>
        <Link
          href="/work-with-me"
          className={`${styles.navCta} ${isWorkWithMe ? styles.navCtaActive : ""}`}
        >
          Work With Me
        </Link>
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
