import { IconGithub } from '@/common/constants/icons.ts';
import { LinkProps } from '@/common/constants/index.ts';
import clsx from 'clsx';
import Image from 'next/image';
import type { JSX } from 'react';
import type { PersonData } from '../../data/team-data';
import styles from './PersonCard.module.scss';

type PersonCardProps = PersonData & {
  className?: string;
};

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
      <div className={styles.avatar}>
        <div className={styles.thumb}>
          <Image
            src={avatar}
            alt={`${name}'s avatar`}
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
      <span className={styles.name}>{name}</span>
      <span className={styles.role}>{role}</span>
      <a className={styles.github} href={github} {...LinkProps}>
        <IconGithub size={20} />
        {githubName}
      </a>
      <b>Contribution:</b>
      <ul className={styles.contribution}>
        {contribution.map(item => (
          <li className={styles['list-item']} key={item}>
            <span style={BULLET_STYLE}>{BULLET}</span> {item}
          </li>
        ))}
      </ul>
      <b>About:</b>
      <p className={styles.bio}>{brief}</p>
    </div>
  );
};
