import React, { useContext, useEffect } from 'react';
import JurisdictionContext from '../context/jurisdiction/jurisdictionContext';
import DayToken from './DayToken';

const JurisdictionListItem = ({ jurisdiction }) => {
  const jurisdictionContext = useContext(JurisdictionContext);
  const { deleteJurisdiction, setCurrent, clearCurrent } = jurisdictionContext;

  const { _id, name, daysAllowed } = jurisdiction;

  const onDelete = () => {
    deleteJurisdiction(_id);
    clearCurrent();
  };

  return (
    <div className='card'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span style={{ float: 'right' }}>
          <DayToken jurisdiction={jurisdiction} />
        </span>
      </h3>
      <p>Days Allowed: {daysAllowed}</p>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(jurisdiction)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

const JurisdictionList = () => {
  const jurisdictionContext = useContext(JurisdictionContext);
  const { jurisdictions, getJurisdictions, loading } = jurisdictionContext;

  useEffect(() => {
    getJurisdictions();
    // eslint-disable-next-line
  }, []);

  if (jurisdictions.length === 0 && !loading) {
    return <h4>Please add a jurisdiction.</h4>;
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        jurisdictions.map((jurisdiction) => (
          <JurisdictionListItem key={jurisdiction._id} jurisdiction={jurisdiction} />
        ))
      )}
    </div>
  );
};

export default JurisdictionList;
