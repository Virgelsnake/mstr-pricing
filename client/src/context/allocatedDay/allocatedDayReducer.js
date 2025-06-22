import {
  GET_ALLOCATED_DAYS,
  ADD_ALLOCATED_DAY,
  ALLOCATED_DAY_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ALLOCATED_DAYS:
      return {
        ...state,
        allocatedDays: action.payload,
        loading: false,
      };
    case ADD_ALLOCATED_DAY:
      return {
        ...state,
        allocatedDays: [...state.allocatedDays, action.payload],
        loading: false,
      };
    case ALLOCATED_DAY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
