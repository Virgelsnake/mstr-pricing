
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import JurisdictionState from './context/jurisdiction/JurisdictionState';
import AllocatedDayState from './context/allocatedDay/AllocatedDayState';
import JurisdictionForm from './components/JurisdictionForm';
import JurisdictionList from './components/JurisdictionList';
import MyCalendar from './components/MyCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

function App() {
  return (
    <JurisdictionState>
      <AllocatedDayState>
        <DndProvider backend={HTML5Backend}>
          <div className='App'>
            <h1>Time in Country</h1>
            <div className='grid-2'>
              <div>
                <JurisdictionForm />
                <JurisdictionList />
              </div>
              <div>
                <MyCalendar />
              </div>
            </div>
          </div>
        </DndProvider>
      </AllocatedDayState>
    </JurisdictionState>
  );
}

export default App;

