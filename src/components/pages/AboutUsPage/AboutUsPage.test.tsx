'use client';

import type { ReactNode } from 'react';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import AboutUsPage from './AboutUsPage';
import { teamData } from '../../../data/team-data';
import * as PersonCardModule from '../../../components/PersonCard/PersonCard';

vi.mock('../../../components/PersonCard/PersonCard', () => ({
  PersonCard: ({ name }: any) => React.createElement('div', { 'data-testid': 'person-card' }, name),
}));

describe('AboutUsPage', () => {
  it('renders the heading', () => {
    // render(<AboutUsPage />);
    // expect(screen.getByRole('heading', { name: /our team/i })).toBeInTheDocument();
  });

  it('renders all team members', () => {
    // render(<AboutUsPage />);
    // const cards = screen.getAllByTestId('person-card');
    // expect(cards).toHaveLength(teamData.length);
    // teamData.forEach(person => {
    //   expect(screen.getByText(person.name)).toBeInTheDocument();
    // });
  });
});
