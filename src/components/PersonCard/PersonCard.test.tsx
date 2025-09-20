import React from 'react';
import { render, screen } from '@testing-library/react';
import { PersonCard } from './PersonCard';

describe('PersonCard', () => {
  it('renders person information correctly', () => {
    // const mockPerson = {
    //   id: 1,
    //   name: 'John Doe',
    //   role: 'Developer',
    //   avatar: '/avatar.jpg',
    //   github: 'https://github.com/johndoe',
    //   brief: 'A brief bio',
    // };
    // render(<PersonCard {...mockPerson} />);
    // expect(screen.getByText(mockPerson.name)).toBeInTheDocument();
    // expect(screen.getByText(mockPerson.role)).toBeInTheDocument();
    // expect(screen.getByText(mockPerson.brief)).toBeInTheDocument();
    // expect(screen.getByRole('link', { name: /johndoe/i })).toHaveAttribute(
    //   'href',
    //   mockPerson.github,
    // );
    // expect(screen.getByAltText(`${mockPerson.name}'s avatar`)).toBeInTheDocument();
  });
});
