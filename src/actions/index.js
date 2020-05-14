import axios from 'axios';
import { FETCH_CARDS_SUCCESS, FETCH_CARDS_PENDING } from '../actions/types';

const filterAllCards = (cards) => {
  let allCards = [];

  Object.keys(cards).filter(name => name !== 'Debug' && name !== 'Promo' && name !== 'System').map(element => {
    cards[element].map(item => {
      allCards.push(item);
    })
  });

  return allCards;
}

const headers = {
  'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
  'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
}

export const fetchAllCards = (url) => (dispatch) => {
  if(url) {
    const request = axios({
      method: 'GET',
      url: url,
      headers: headers
    });
  
    dispatch({ type: FETCH_CARDS_PENDING, payload: { pending: true }});
  
    request.then((res) => {
      let classCards = [];
      classCards = res.data;
  
      dispatch({ type: FETCH_CARDS_SUCCESS, payload: { cards: classCards }});
      }
    )
  } else {
    const request = axios({
      method: 'GET',
      url: 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards?locale=frFR',
      headers: headers
    });
  
    dispatch({ type: FETCH_CARDS_PENDING, payload: { pending: true }});
  
    request.then((res) => {
      let filteredCards = [];
      filteredCards = filterAllCards(res.data);
  
      dispatch({ type: FETCH_CARDS_SUCCESS, payload: { cards: filteredCards }});
      }
    )
  }
}
