import type { ReactNode } from 'react';
import styles from './Header.module.scss';

export const Header = (): ReactNode => {
  return (
    <header className={styles.header}>
      <p>Header</p>
    </header>
  );
};
