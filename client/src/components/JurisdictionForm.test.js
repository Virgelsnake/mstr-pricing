import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JurisdictionForm from './JurisdictionForm';
import JurisdictionContext from '../context/jurisdiction/jurisdictionContext';

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <JurisdictionContext.Provider value={providerProps}>{ui}</JurisdictionContext.Provider>,
    renderOptions
  );
};

describe('JurisdictionForm', () => {
  const mockAddJurisdiction = jest.fn();
  const mockUpdateJurisdiction = jest.fn();
  const mockClearCurrent = jest.fn();

  const providerProps = {
    addJurisdiction: mockAddJurisdiction,
    updateJurisdiction: mockUpdateJurisdiction,
    clearCurrent: mockClearCurrent,
    current: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the form with an "Add Jurisdiction" button', () => {
    renderWithContext(<JurisdictionForm />, { providerProps });
    expect(
      screen.getByRole('button', { name: /add jurisdiction/i })
    ).toBeInTheDocument();
  });

  it('should allow user to fill out and submit the form', async () => {
    renderWithContext(<JurisdictionForm />, { providerProps });

    await userEvent.type(screen.getByPlaceholderText('Jurisdiction Name'), 'Testland');
    await userEvent.type(screen.getByPlaceholderText('Days Allowed'), '90');
    fireEvent.click(screen.getByRole('button', { name: /add jurisdiction/i }));

    expect(mockAddJurisdiction).toHaveBeenCalledWith({
      name: 'Testland',
      daysAllowed: '90',
    });
  });

  it('should display current jurisdiction data when editing', () => {
    const currentJurisdiction = {
      _id: '1',
      name: 'Editland',
      daysAllowed: 120,
    };
    const propsWithCurrent = { ...providerProps, current: currentJurisdiction };
    renderWithContext(<JurisdictionForm />, { providerProps: propsWithCurrent });

    expect(screen.getByPlaceholderText('Jurisdiction Name')).toHaveValue('Editland');
    expect(screen.getByPlaceholderText('Days Allowed')).toHaveValue(120);
    expect(screen.getByRole('button', { name: /update jurisdiction/i })).toBeInTheDocument();
  });

  it('should call updateJurisdiction when the update button is clicked', async () => {
    const currentJurisdiction = {
      _id: '1',
      name: 'Editland',
      daysAllowed: 120,
    };
    const propsWithCurrent = { ...providerProps, current: currentJurisdiction };
    renderWithContext(<JurisdictionForm />, { providerProps: propsWithCurrent });

    const nameInput = screen.getByPlaceholderText('Jurisdiction Name');
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Updatedland');
    fireEvent.click(screen.getByRole('button', { name: /update jurisdiction/i }));

    expect(mockUpdateJurisdiction).toHaveBeenCalledWith({
      _id: '1',
      name: 'Updatedland',
      daysAllowed: 120,
    });
  });

  it('should call clearCurrent when the clear button is clicked', () => {
    const currentJurisdiction = {
      _id: '1',
      name: 'Editland',
      daysAllowed: 120,
    };
    const propsWithCurrent = { ...providerProps, current: currentJurisdiction };
    renderWithContext(<JurisdictionForm />, { providerProps: propsWithCurrent });

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));

    expect(mockClearCurrent).toHaveBeenCalled();
  });
});
