import React from 'react';
import { render, screen } from '@testing-library/react';
import { PersonCard } from './PersonCard';
import { IconGithub } from '@/common/constants/icons';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

describe('PersonCard', () => {
  it('renders person information correctly', () => {
    const mockPerson = {
      id: 1,
      name: 'John Doe',
      role: 'Developer',
      avatar: '/avatar.jpg',
      github: 'https://github.com/johndoe',
      brief: 'A brief bio',
    };

    render(<PersonCard {...mockPerson} />);

    expect(screen.getByText(mockPerson.name)).toBeInTheDocument();
    expect(screen.getByText(mockPerson.role)).toBeInTheDocument();

    expect(screen.getByText('about:')).toBeInTheDocument();
    expect(screen.getByText(mockPerson.brief)).toBeInTheDocument();

    const githubName = 'johndoe';
    const link = screen.getByRole('link', { name: githubName });
    expect(link).toHaveAttribute('href', mockPerson.github);

    expect(screen.getByAltText(`${mockPerson.name}'s avatar`)).toBeInTheDocument();
  });
});
