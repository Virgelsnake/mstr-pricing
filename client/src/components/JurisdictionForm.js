import React, { useState, useContext } from 'react';
import JurisdictionContext from '../context/jurisdiction/jurisdictionContext';

const JurisdictionForm = () => {
  const jurisdictionContext = useContext(JurisdictionContext);
  const { addJurisdiction } = jurisdictionContext;

  const [jurisdiction, setJurisdiction] = useState({
    name: '',
    daysAllowed: '',
  });

  const { name, daysAllowed } = jurisdiction;

  const onChange = (e) =>
    setJurisdiction({ ...jurisdiction, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addJurisdiction(jurisdiction);
    setJurisdiction({
      name: '',
      daysAllowed: '',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Jurisdiction</h2>
      <input
        type='text'
        placeholder='Name'
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
          value='Add Jurisdiction'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default JurisdictionForm;
