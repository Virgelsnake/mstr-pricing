import {
  GET_JURISDICTIONS,
  ADD_JURISDICTION,
  DELETE_JURISDICTION,
  UPDATE_JURISDICTION,
  JURISDICTION_ERROR,
  SET_DRAGGED_JURISDICTION,
} from '../types';

const jurisdictionReducer = (state, action) => {
  switch (action.type) {
    case GET_JURISDICTIONS:
      return {
        ...state,
        jurisdictions: action.payload,
        loading: false,
      };
    case ADD_JURISDICTION:
      return {
        ...state,
        jurisdictions: [...state.jurisdictions, action.payload],
        loading: false,
      };
    case UPDATE_JURISDICTION:
      return {
        ...state,
        jurisdictions: state.jurisdictions.map((jurisdiction) =>
          jurisdiction._id === action.payload._id ? action.payload : jurisdiction
        ),
        loading: false,
      };
    case DELETE_JURISDICTION:
      return {
        ...state,
        jurisdictions: state.jurisdictions.filter(
          (jurisdiction) => jurisdiction._id !== action.payload
        ),
        loading: false,
      };
    case JURISDICTION_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case SET_DRAGGED_JURISDICTION:
      return {
        ...state,
        draggedJurisdiction: action.payload,
      };
    default:
      return state;
  }
};

export default jurisdictionReducer;
