import { Link } from '@/i18n/navigation.ts';
import { LinkProps } from '@common/constants';
import Image from 'next/image';
import type { JSX } from 'react';
import styles from './Footer.module.scss';

export const COPYRIGHT = '© 2025 RSSchool';
export const RSS_URL = 'https://rs.school/courses/reactjs';
export const RSS_LOGO_SRC = '/rss-logo.svg';
const RSS_LOGO_ALT = 'RSS logo';

const AUTHORS = [
  { name: 'Nataliya', url: 'https://github.com/nataliyamoon' },
  { name: 'Anna', url: 'https://github.com/AnnaSergeevnaIv' },
  { name: 'Andrew', url: 'https://github.com/dusixx' },
];

export const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <div className={styles.authors}>
        {AUTHORS.map((author, i) => (
          <span key={author.name}>
            <a href={author.url} target='_blank' rel='noopener noreferrer'>
              {author.name}
            </a>
            {i < AUTHORS.length - 1 && ' | '}
          </span>
        ))}
      </div>
      <Link className={styles.link} href={RSS_URL} {...LinkProps}>
        <Image
          className={styles.logo}
          src={RSS_LOGO_SRC}
          alt={RSS_LOGO_ALT}
          width={40}
          height={40}
        />
        <span>{COPYRIGHT}</span>
      </Link>
    </footer>
  );
};
