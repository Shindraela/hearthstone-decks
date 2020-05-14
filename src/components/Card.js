import React from 'react';

const Card = props => (
  props.cards.map((card, index) => (
    <div className="image-container" key={index}>
      <img src={card.img} className="responsive" alt="img" />

      <div className="card-body">
        <h5 className="card-title">{card.name}</h5>
        <p className="card-text">
          Text : {card.text}
        </p>
        <p className="card-text">
          Flavor : {card.flavor}
        </p>
        <p className="card-text">
          Rarity : {card.rarity}
        </p>
        <p className="card-text">
          Type : {card.type}
        </p>
        <p className="card-text">
          Player Class : {card.playerClass}
        </p>
      </div>
    </div>
  ))
);

export default Card;
