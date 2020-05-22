import axios from 'axios';
import { FETCH_CARDS_SUCCESS, FETCH_CARDS_PENDING, FETCH_ACCESS_TOKEN_SUCCESS, FETCH_ACCESS_TOKEN_PENDING } from './types';

export const fetchAllCards = (url) => (dispatch) => {
  if(url) {
    const access_token = localStorage.getItem('accessToken');
    const request = axios({
      method: 'GET',
      url: url,
      headers: {
        'Authorization': 'bearer ' + access_token,
        'Content-Type': 'application/json'
      }
    });
  
    dispatch({ type: FETCH_CARDS_PENDING, payload: { pending: true }});
  
    request.then((res) => {
      let classCards = [];
      let pageCount = null;

      if(res && res.data && res.data.cards.length > 0) {
        classCards = res.data.cards;
        pageCount = res.data.pageCount ? res.data.pageCount : null;
      }
  
      dispatch({ type: FETCH_CARDS_SUCCESS, payload: { cards: classCards, pageCount }});
      }
    )
  }
}

export const getNewAccessToken = () => (dispatch) => {
  const client_id = process.env.REACT_APP_HEARTHSTONE_CLIENT_ID;
  const client_secret = process.env.REACT_APP_HEARTHSTONE_CLIENT_SECRET;
  const currentAccessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : null;
  let accessToken = null;

  if(currentAccessToken === null) {
    const tokenRequest = axios({
      method: 'POST',
      url: `https://us.battle.net/oauth/token?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    dispatch({ type: FETCH_ACCESS_TOKEN_PENDING, payload: { pending: true }});
  
    tokenRequest.then((res) => {
      if(res && res.data) {
        accessToken = res.data.access_token;
        localStorage.setItem('accessToken', accessToken);
      }
  
      dispatch({ type: FETCH_ACCESS_TOKEN_SUCCESS, payload: { pending: false }});
    });
  }
}
