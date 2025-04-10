import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from './Dropdown';
import { vi } from 'vitest';

describe('Dropdown', () => {
  const mockOptions = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
  ];

  const setup = (value = 'a', onChange = vi.fn()) => {
    render(
      <Dropdown
        label="Test Dropdown"
        options={mockOptions}
        value={value}
        onChange={onChange}
      />
    );
    return { onChange };
  };

  it('renders with label and options', () => {
    setup();
    expect(screen.getByLabelText('Test Dropdown')).toBeInTheDocument();
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('shows the selected value', () => {
    setup('b');
    const dropdown = screen.getByRole('combobox') as HTMLSelectElement;
    expect(dropdown.value).toBe('b');
  });

  it('calls onChange when selection changes', () => {
    const { onChange } = setup();
    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'b' } });
    expect(onChange).toHaveBeenCalledWith('b');
  });
});