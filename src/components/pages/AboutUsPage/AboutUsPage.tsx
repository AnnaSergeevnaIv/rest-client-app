'use client';

import type { ReactNode } from 'react';
import { PersonCard } from '../../../components/PersonCard/PersonCard.tsx';
import { teamData } from '../../../data/team-data.ts';
import styles from './AboutUsPage.module.scss';
import { useTranslations } from 'next-intl';

export default function AboutUsPage(): ReactNode {
  const tAboutUs = useTranslations('AboutUsPage');
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>{tAboutUs('heading')}</h1>
      <ul className={styles.cards}>
        {teamData.map(person => (
          <li key={person.id} className={styles.card}>
            <PersonCard {...person} />
          </li>
        ))}
      </ul>
    </main>
  );
}
