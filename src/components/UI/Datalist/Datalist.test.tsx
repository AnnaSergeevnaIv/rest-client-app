import { render, screen, within } from '@testing-library/react';
import { Datalist } from './Datalist';

describe('Datalist', () => {
  it('renders unique options using removeDups', () => {
    render(<Datalist listId='unique' items={['A', 'B', 'A']} name='test' />);
    const datalist =
      screen.getByRole('listbox', { hidden: true }) || document.getElementById('unique');
    const options = within(datalist!).getAllByRole('option', { hidden: true });
    expect(options).toHaveLength(2);
    expect(options.map(opt => opt.getAttribute('value'))).toEqual(['A', 'B']);
  });

  it('renders options with correct values', () => {
    render(<Datalist listId='cars' items={['BMW', 'Audi']} name='car' />);
    const datalist = document.getElementById('cars')!;
    const options = datalist.querySelectorAll('option');
    expect(Array.from(options).map(o => o.value)).toEqual(['BMW', 'Audi']);
  });
});
