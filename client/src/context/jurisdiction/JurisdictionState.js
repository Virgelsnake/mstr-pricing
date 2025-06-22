import React, { useReducer } from 'react';
import axios from 'axios';
import JurisdictionContext from './jurisdictionContext';
import jurisdictionReducer from './jurisdictionReducer';
import {
  GET_JURISDICTIONS,
  ADD_JURISDICTION,
  DELETE_JURISDICTION,
  UPDATE_JURISDICTION,
  JURISDICTION_ERROR,
  SET_DRAGGED_JURISDICTION,
} from '../types';

const JurisdictionState = (props) => {
  const initialState = {
    jurisdictions: [],
    loading: true,
    error: null,
    draggedJurisdiction: null,
  };

  const [state, dispatch] = useReducer(jurisdictionReducer, initialState);

  // Get Jurisdictions
  const getJurisdictions = async () => {
    try {
      const res = await axios.get('/api/jurisdictions');
      dispatch({ type: GET_JURISDICTIONS, payload: res.data });
    } catch (err) {
      dispatch({ type: JURISDICTION_ERROR, payload: err.response.msg });
    }
  };

  // Add Jurisdiction
  const addJurisdiction = async (jurisdiction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/jurisdictions', jurisdiction, config);
      dispatch({ type: ADD_JURISDICTION, payload: res.data });
    } catch (err) {
      dispatch({ type: JURISDICTION_ERROR, payload: err.response.msg });
    }
  };

  // Delete Jurisdiction
  const deleteJurisdiction = async (id) => {
    try {
      await axios.delete(`/api/jurisdictions/${id}`);
      dispatch({ type: DELETE_JURISDICTION, payload: id });
    } catch (err) {
      dispatch({ type: JURISDICTION_ERROR, payload: err.response.data.msg });
    }
  };

  // Set Dragged Jurisdiction
  const setDraggedJurisdiction = (jurisdiction) => {
    dispatch({ type: SET_DRAGGED_JURISDICTION, payload: jurisdiction });
  };

  // Update Jurisdiction
  const updateJurisdiction = async (jurisdiction) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/jurisdictions/${jurisdiction._id}`,
        jurisdiction,
        config
      );
      dispatch({ type: UPDATE_JURISDICTION, payload: res.data });
    } catch (err) {
      dispatch({ type: JURISDICTION_ERROR, payload: err.response.msg });
    }
  };

  return (
    <JurisdictionContext.Provider
      value={{
        jurisdictions: state.jurisdictions,
        loading: state.loading,
        error: state.error,
        draggedJurisdiction: state.draggedJurisdiction,
        getJurisdictions,
        addJurisdiction,
        deleteJurisdiction,
        setDraggedJurisdiction,
        updateJurisdiction,
      }}
    >
      {props.children}
    </JurisdictionContext.Provider>
  );
};

export default JurisdictionState;
