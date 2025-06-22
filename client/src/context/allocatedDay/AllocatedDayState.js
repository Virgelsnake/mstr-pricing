import React, { useReducer } from 'react';
import axios from 'axios';
import AllocatedDayContext from './allocatedDayContext';
import allocatedDayReducer from './allocatedDayReducer';
import {
  GET_ALLOCATED_DAYS,
  ADD_ALLOCATED_DAY,
  ALLOCATED_DAY_ERROR,
} from '../types';

const AllocatedDayState = (props) => {
  const initialState = {
    allocatedDays: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(allocatedDayReducer, initialState);

  // Get Allocated Days
  const getAllocatedDays = async () => {
    try {
      const res = await axios.get('/api/allocated-days');
      dispatch({ type: GET_ALLOCATED_DAYS, payload: res.data });
    } catch (err) {
      dispatch({ type: ALLOCATED_DAY_ERROR, payload: err.response.data.msg });
    }
  };

  // Add Allocated Day
  const addAllocatedDay = async (allocatedDay) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/allocated-days', allocatedDay, config);
      dispatch({ type: ADD_ALLOCATED_DAY, payload: res.data });
    } catch (err) {
      dispatch({ type: ALLOCATED_DAY_ERROR, payload: err.response.data.msg });
    }
  };

  return (
    <AllocatedDayContext.Provider
      value={{
        allocatedDays: state.allocatedDays,
        loading: state.loading,
        error: state.error,
        getAllocatedDays,
        addAllocatedDay,
      }}
    >
      {props.children}
    </AllocatedDayContext.Provider>
  );
};

export default AllocatedDayState;
