import React from 'react';
import Card from './Card';
import LoadingRing from './LoadingRing';
import uniqBy from 'lodash/uniqBy';

export class CardsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: 20,
      loading: false,
      currentCards: props.cards.slice(0, 20),
      currentId: 20
    }

    this.loadMore = this.loadMore.bind(this);
  }

  static componentWillReceiveProps(nextProps) {
    // Any time props.cards changes, update state.
    if (nextProps.cards !== this.props.cards) {
      this.setState({
        currentCards: nextProps.currentCards
      });
    }
  }

  componentDidMount() {
    const myScroll = this.refs.myscroll;

    myScroll.addEventListener("scroll", () => {
      
      if ((myScroll.scrollTop + myScroll.clientHeight) >= myScroll.scrollHeight) {
        this.loadMore();
      }
    });
  }

  showItems() {
    const { currentCards } = this.state;
    let items = [];
    
    for (var i = 0; i < currentCards.length; i++) {
      items.push(
        <Card currentCards={currentCards[i]} key={i} />
      )
    }

    return items;
  }

  filtered(arrayToFilter) {
    const { currentId } = this.state;
    let id = currentId;
    let results = null;
    id = id + 20;

    this.setState({
      currentId: id
    });

    arrayToFilter = uniqBy(arrayToFilter, 'name');
    results = arrayToFilter.slice(currentId, id);

    return results;
  }

  loadMore() {
    const { cards } = this.props;
    const { currentCards, currentId } = this.state;
    const totalOfCurrentCards = currentCards.length;
    const totalOfCards = uniqBy(cards, 'name').length;

    if(totalOfCurrentCards === totalOfCards) {
      this.setState({
        loading: false
      }); 
    } else {
      this.setState({
        loading: true
      });
  
      setTimeout(() => {
        this.setState({
          currentCards: [...currentCards, ...this.filtered(cards)],
          loading: false
        });
      }, 2000);
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
    const { loading } = this.state;
    const loader = <LoadingRing color="#2c82c9" />;

    return (
      <div className="container cards-container" ref="myscroll">
        { cards && cards.length === 0 ? loader : <div className="row gallery-container">{this.showItems()}</div> }
        { loading ? loader : "" }
      </div>
    )
  }
}

export default CardsList;
