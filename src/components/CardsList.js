import React from 'react';
import Card from './Card';
import InfiniteScroll from 'react-infinite-scroller';

export class CardsList extends React.Component {
  constructor() {
    super();

    this.state = {
      hasMoreItems: true
    }
  }

  renderCards() {
    const { cards } = this.props;

    return cards && cards.length > 0 ?
      <div className="all-images">
        <Card cards={cards} />
      </div> : <div>Pas de cartes trouvées.</div>
  }

  render() {
    const { cards } = this.props;

    return (
      <div className="container">
        {
          cards.length === 0 ? <div className="row">Chargement...</div> : <div className="gallery-container">{this.renderCards()}</div>
        }
      </div>
    )
  }
}

export default CardsList;
