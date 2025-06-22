import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';
import JurisdictionContext from '../context/jurisdiction/jurisdictionContext';

const DayToken = ({ jurisdiction }) => {
  const jurisdictionContext = useContext(JurisdictionContext);
  const { setDraggedJurisdiction } = jurisdictionContext;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'day-token',
    item: { id: jurisdiction._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: () => {
      setDraggedJurisdiction(null);
    },
  }));

  const tokenStyle = {
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '15px',
    display: 'inline-block',
    margin: '5px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  };

  return (
    <div ref={drag} style={tokenStyle} onDragStart={() => setDraggedJurisdiction(jurisdiction)}>
      +1 Day
    </div>
  );
};

export default DayToken;
