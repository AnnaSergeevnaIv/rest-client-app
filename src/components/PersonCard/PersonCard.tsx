import clsx from 'clsx';
import type { JSX } from 'react';
import type { PersonData } from '../../../data/team-data';
import styles from './PersonCard.module.scss';
import Image from 'next/image';

type PersonCardProps = PersonData & { className?: string };

const BULLET = '▪';
const BULLET_STYLE = {
  color: 'var(--color-accent)',
  fontSize: '18px',
};

export const PersonCard = ({
  name,
  role,
  contribution,
  avatar,
  github,
  className,
  brief,
}: PersonCardProps): JSX.Element => {
  const [, githubName] = github.match(/\/([^/]+)$/) ?? [];

  return (
    <div className={clsx(styles['card-wrapper'], className)}>
      <div data-avatar>
        <div className={styles.thumb}>
          <Image
            src={avatar}
            alt={`${name}'s avatar`}
            width={78}
            height={78}
            className={styles.thumb}
          />
        </div>
      </div>
      <span data-name>{name}</span>
      <span data-role>{role}</span>
      <a data-github href={github} rel='noreferrer noopener nofollow' target='_blank'>
        <Image src='/github-logo.png' alt='GitHub logo' width={16} height={16} />
        {githubName}
      </a>
      <b data-heading>Contribution:</b>
      <ul className={styles.contribution}>
        {contribution.map(item => (
          <li key={item}>
            <span style={BULLET_STYLE}>{BULLET}</span> {item}
          </li>
        ))}
      </ul>
      <b data-heading>About:</b>
      <p data-bio>{brief}</p>
    </div>
  );
};
