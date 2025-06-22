import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import JurisdictionList from './JurisdictionList';
import JurisdictionContext from '../context/jurisdiction/jurisdictionContext';

const renderWithContext = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <DndProvider backend={HTML5Backend}>
      <JurisdictionContext.Provider value={providerProps}>
        {ui}
      </JurisdictionContext.Provider>
    </DndProvider>,
    renderOptions
  );
};

describe('JurisdictionList', () => {
  const mockGetJurisdictions = jest.fn();
  const mockSetCurrent = jest.fn();
  const mockDeleteJurisdiction = jest.fn();
  const mockClearCurrent = jest.fn();

  const baseProviderProps = {
    getJurisdictions: mockGetJurisdictions,
    setCurrent: mockSetCurrent,
    deleteJurisdiction: mockDeleteJurisdiction,
    clearCurrent: mockClearCurrent,
    loading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a message when there are no jurisdictions', () => {
    const providerProps = { ...baseProviderProps, jurisdictions: [] };
    renderWithContext(<JurisdictionList />, { providerProps });
    expect(screen.getByText('Please add a jurisdiction.')).toBeInTheDocument();
  });

  it('should render a list of jurisdictions', () => {
    const jurisdictions = [
      { _id: '1', name: 'Testland', daysAllowed: 90 },
      { _id: '2', name: 'USA', daysAllowed: 183 },
    ];
    const providerProps = { ...baseProviderProps, jurisdictions };
    renderWithContext(<JurisdictionList />, { providerProps });

    expect(screen.getByText('Testland')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
  });

  it('should call setCurrent when edit button is clicked', () => {
    const jurisdictions = [{ _id: '1', name: 'Testland', daysAllowed: 90 }];
    const providerProps = { ...baseProviderProps, jurisdictions };
    renderWithContext(<JurisdictionList />, { providerProps });

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    expect(mockSetCurrent).toHaveBeenCalledWith(jurisdictions[0]);
  });

  it('should call deleteJurisdiction when delete button is clicked', () => {
    const jurisdictions = [{ _id: '1', name: 'Testland', daysAllowed: 90 }];
    const providerProps = { ...baseProviderProps, jurisdictions };
    renderWithContext(<JurisdictionList />, { providerProps });

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    expect(mockDeleteJurisdiction).toHaveBeenCalledWith('1');
  });

  it('should call getJurisdictions on initial render', () => {
    const providerProps = { ...baseProviderProps, jurisdictions: [] };
    renderWithContext(<JurisdictionList />, { providerProps });
    expect(mockGetJurisdictions).toHaveBeenCalled();
  });
});
