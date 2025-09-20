import type { ReactNode } from 'react';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import AboutUsPage from './AboutUsPage';
import { teamData } from '../../../data/team-data';

vi.mock('../../../components/PersonCard/PersonCard', () => ({
  PersonCard: ({ name }: any) => <div data-testid='person-card'>{name}</div>,
}));

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      heading: 'Our Team',
    };
    return translations[key] ?? key;
  },
}));

describe('AboutUsPage', () => {
  it('renders the heading', () => {
    render(<AboutUsPage />);
    expect(screen.getByRole('heading', { name: /our team/i })).toBeInTheDocument();
  });

  it('renders all team members', () => {
    render(<AboutUsPage />);
    const cards = screen.getAllByTestId('person-card');
    expect(cards).toHaveLength(teamData.length);

    teamData.forEach(person => {
      expect(screen.getByText(person.name)).toBeInTheDocument();
    });
  });
});
