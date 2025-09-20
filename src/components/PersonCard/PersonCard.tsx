import { IconGithub } from '@/common/constants/icons.ts';
import { LinkProps } from '@/common/constants/index.ts';
import clsx from 'clsx';
import Image from 'next/image';
import type { JSX } from 'react';
import type { PersonData } from '../../data/team-data';
import styles from './PersonCard.module.scss';
import { useTranslations } from 'next-intl';

type PersonCardProps = PersonData & {
  className?: string;
};

export const PersonCard = ({
  name,
  role,
  avatar,
  github,
  className,
  brief,
}: PersonCardProps): JSX.Element => {
  const [, githubName] = github.match(/\/([^/]+)$/) ?? [];
  const tAboutUs = useTranslations('AboutUsPage');

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
      <span className={styles.name}>{tAboutUs(name)}</span>
      <span className={styles.role}>{tAboutUs(role)}</span>
      <a className={styles.github} href={github} {...LinkProps}>
        <IconGithub size={20} />
        {githubName}
      </a>
      <b>{tAboutUs('about')}:</b>
      <p className={styles.bio}>{tAboutUs(brief)}</p>
    </div>
  );
};
