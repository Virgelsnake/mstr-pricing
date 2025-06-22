import React, { useState, useContext, useEffect } from 'react';
import JurisdictionContext from '../context/jurisdiction/jurisdictionContext';

const JurisdictionForm = () => {
  const jurisdictionContext = useContext(JurisdictionContext);
  const { addJurisdiction, updateJurisdiction, clearCurrent, current } =
    jurisdictionContext;

  useEffect(() => {
    if (current !== null) {
      setJurisdiction(current);
    } else {
      setJurisdiction({
        name: '',
        daysAllowed: '',
      });
    }
  }, [jurisdictionContext, current]);

  const [jurisdiction, setJurisdiction] = useState({
    name: '',
    daysAllowed: '',
  });

  const { name, daysAllowed } = jurisdiction;

  const onChange = (e) =>
    setJurisdiction({ ...jurisdiction, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addJurisdiction(jurisdiction);
    } else {
      updateJurisdiction(jurisdiction);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div className='card'>
      <form onSubmit={onSubmit}>
        <h2>{current ? 'Edit Jurisdiction' : 'Add Jurisdiction'}</h2>
        <input
          type='text'
          placeholder='Jurisdiction Name'
          name='name'
          value={name}
          onChange={onChange}
          required
        />
        <input
          type='number'
          placeholder='Days Allowed'
          name='daysAllowed'
          value={daysAllowed}
          onChange={onChange}
          required
        />
        <div>
          <input
            type='submit'
            value={current ? 'Update Jurisdiction' : 'Add Jurisdiction'}
            className='btn btn-primary'
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        {current && (
          <div>
            <button className='btn' style={{ width: '100%' }} onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default JurisdictionForm;
