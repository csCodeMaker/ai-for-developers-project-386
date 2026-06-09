import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';

export function Layout() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          Booking Service
        </Link>
        <nav className={styles.nav}>
          {isAdmin ? (
            <Link to="/" className={styles.navLink}>
              Guest view
            </Link>
          ) : (
            <Link to="/admin" className={styles.navLink}>
              Admin
            </Link>
          )}
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
