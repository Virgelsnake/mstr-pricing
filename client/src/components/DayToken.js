import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';
import JurisdictionContext from '../context/jurisdiction/jurisdictionContext';

const ItemTypes = {
  DAY_TOKEN: 'dayToken',
};

const DayToken = ({ jurisdiction }) => {
  const jurisdictionContext = useContext(JurisdictionContext);
  const { setDraggedJurisdiction } = jurisdictionContext;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.DAY_TOKEN,
    item: { id: jurisdiction._id, name: jurisdiction.name },
    begin: () => setDraggedJurisdiction(jurisdiction),
    end: () => setDraggedJurisdiction(null),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '0.5rem',
        margin: '0.5rem 0',
        backgroundColor: 'lightblue',
        cursor: 'move',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    >
      {jurisdiction.name} Day
    </div>
  );
};

export default DayToken;
