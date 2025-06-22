import React, { useContext, useEffect } from 'react';
import JurisdictionContext from '../context/jurisdiction/jurisdictionContext';

const JurisdictionList = () => {
  const jurisdictionContext = useContext(JurisdictionContext);

  const { jurisdictions, getJurisdictions, loading, deleteJurisdiction } = jurisdictionContext;

  useEffect(() => {
    getJurisdictions();
    // eslint-disable-next-line
  }, []);

  if (jurisdictions.length === 0 && !loading) {
    return <h4>Please add a jurisdiction.</h4>;
  }

  return (
    <div>
      <h2 className='text-primary'>My Jurisdictions</h2>
      {jurisdictions.length > 0 && !loading ? (
        jurisdictions.map((jurisdiction) => (
          <div key={jurisdiction._id} className='card bg-light'>
            <h3 className='text-primary text-left'>
              {jurisdiction.name}{' '}
              <span style={{ float: 'right' }} className='badge badge-primary'>
                Days Allowed: {jurisdiction.daysAllowed}
              </span>
            </h3>
            <button className='btn btn-dark btn-sm'>Edit</button>
            <button className='btn btn-danger btn-sm' onClick={() => deleteJurisdiction(jurisdiction._id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JurisdictionList;
