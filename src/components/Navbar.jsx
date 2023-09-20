// Navbar.js
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const links = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'About',
    route: '/AboutUs/page',
  },
  {
    label: 'Nuestros Productos',
    route: '/Products/page',
  },
];

const Navbar = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navigation}>
          {links.map(({ label, route }) => (
            <li key={route} className={styles.navigationItem}>
              <Link href={route}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
