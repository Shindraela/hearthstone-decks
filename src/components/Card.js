import React from 'react';
import cardback from '../assets/cardback.png';

const Card = props => (
  <div className="image-container">
    {
      props.currentCards.image ?
      <div className="card-body">
        <img src={props.currentCards.image} className="responsive" alt="img" />
      </div> :
      <div className="card-body">
        <img src={cardback} className="responsive" alt="img" />
      </div>
    }
  </div>
);

export default Card;
