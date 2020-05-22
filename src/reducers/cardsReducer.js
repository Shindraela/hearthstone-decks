import {
  FETCH_CARDS_PENDING,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE
} from "../actions/types";

const initialState = {
  pending: false,
  error: null,
  pageCount: null,
  items: [],
};

export default function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CARDS_PENDING:
      return { ...state, pending: true };
    case FETCH_CARDS_SUCCESS:
      return {...state, pending: false, items: action.payload.cards, pageCount: action.payload.pageCount };
    case FETCH_CARDS_FAILURE:
      return { ...state, pending: false, error: action.payload.error };
    default:
      return state;
  }
}
