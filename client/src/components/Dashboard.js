import React, { useContext, useEffect } from 'react';
import JurisdictionContext from '../context/jurisdiction/jurisdictionContext';
import AllocatedDayContext from '../context/allocatedDay/allocatedDayContext';
import ProgressBar from './ProgressBar';

const Dashboard = () => {
  const jurisdictionContext = useContext(JurisdictionContext);
  const { jurisdictions, getJurisdictions } = jurisdictionContext;

  const allocatedDayContext = useContext(AllocatedDayContext);
  const { allocatedDays, getAllocatedDays } = allocatedDayContext;

  useEffect(() => {
    getJurisdictions();
    getAllocatedDays();
    // eslint-disable-next-line
  }, []);

  const getDaysUsed = (jurisdictionId) => {
    if (!allocatedDays) return 0;
    return allocatedDays.filter(
      (day) => day.jurisdiction && day.jurisdiction._id === jurisdictionId
    ).length;
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className='grid-2'>
        {jurisdictions.map((j) => (
          <div key={j._id} className='card'>
            <h3>{j.name}</h3>
            <ProgressBar value={getDaysUsed(j._id)} max={j.daysAllowed} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
