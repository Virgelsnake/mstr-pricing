
import React from 'react';
import JurisdictionState from './context/jurisdiction/JurisdictionState';
import JurisdictionForm from './components/JurisdictionForm';
import JurisdictionList from './components/JurisdictionList';
import './App.css';

function App() {
  return (
    <JurisdictionState>
      <div className='App'>
        <h1>Time in Country</h1>
        <div className='grid-2'>
          <div>
            <JurisdictionForm />
          </div>
          <div>
            <JurisdictionList />
          </div>
        </div>
      </div>
    </JurisdictionState>
  );
}

export default App;

