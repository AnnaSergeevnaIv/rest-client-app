'use client';

import type { ReactNode } from 'react';
import { PersonCard } from '../../../components/PersonCard/PersonCard.tsx';
import { teamData, collabDesc } from '../../../../data/team-data.ts';
import styles from './AboutUsPage.module.scss';

export default function AboutUsPage(): ReactNode {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.heading}>Our team</h1>

      <ul className={styles.cards}>
        {teamData.map(person => (
          <li key={person.id} className={styles.card}>
            <PersonCard {...person} />
          </li>
        ))}
      </ul>

      <div className={styles['collab-wrapper']}>
        <h2>Our effective collaboration</h2>
        <pre className={styles['collab-desc']}>{collabDesc}</pre>
      </div>
    </main>
  );
}
