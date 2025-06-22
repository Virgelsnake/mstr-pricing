
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import JurisdictionState from './context/jurisdiction/JurisdictionState';
import AllocatedDayState from './context/allocatedDay/AllocatedDayState';
import Navbar from './components/Navbar';
import JurisdictionForm from './components/JurisdictionForm';
import JurisdictionList from './components/JurisdictionList';
import MyCalendar from './components/MyCalendar';
import Dashboard from './components/Dashboard';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './App.css';

const Home = () => (
  <div className='grid-2'>
    <div>
      <JurisdictionForm />
      <JurisdictionList />
    </div>
    <div>
      <MyCalendar />
    </div>
  </div>
);

function App() {
  return (
    <JurisdictionState>
      <AllocatedDayState>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <Navbar />
            <div className='container'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
              </Routes>
            </div>
          </Router>
        </DndProvider>
      </AllocatedDayState>
    </JurisdictionState>
  );
}

export default App;

