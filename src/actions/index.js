import axios from 'axios';
import { FETCH_CARDS_SUCCESS, FETCH_CARDS_PENDING } from './types';

export const fetchAllCards = (url) => (dispatch) => {
  if(url) {
    const request = axios({
      method: 'GET',
      url: url,
      headers: {
        'Authorization': 'bearer ' + process.env.REACT_APP_HEARTHSTONE_KEY,
        'Content-Type': 'application/json'
      }
    });
  
    dispatch({ type: FETCH_CARDS_PENDING, payload: { pending: true }});
  
    request.then((res) => {
      let classCards = [];
      classCards = res.data.cards;
  
      dispatch({ type: FETCH_CARDS_SUCCESS, payload: { cards: classCards }});
      }
    )
  }
}
