import React from 'react';
import Card from './Card';
import LoadingRing from './LoadingRing';
import uniqBy from 'lodash/uniqBy';
import { connect } from 'react-redux';
import { fetchAllCards } from '../actions/index';

export class CardsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      currentCards: [...props.cards],
      nextPage: 2
    }

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { cards } = this.props;

    if (cards !== prevProps.cards) {
      this.setNewCurrentCards(cards);
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

  setNewCurrentCards(newCards) {
    const { currentCards } = this.state;

    this.setState({
      currentCards: [...currentCards, ...newCards]
    });
  }

  renderCards() {
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
    arrayToFilter = uniqBy(arrayToFilter, 'name');
    return arrayToFilter;
  }

  loadMore() {
    const { pageCount } = this.props;
    const { nextPage } = this.state;
    const selectedClass = localStorage.getItem('selectedClass');

    if(nextPage <= pageCount) {
      const { fetchAllCards } = this.props;
      const chosenClassUrl = `https://api.blizzard.com/hearthstone/cards?class=${selectedClass}%2Cneutral&collectible=1&deckFormat=standard&multiClass=${selectedClass}&order=asc&page=${nextPage}&pageSize=40&set=standard&sort=manaCost&locale=fr_FR`;

      this.setState({
        loading: true,
        nextPage: (nextPage + 1)
      });

      fetchAllCards(chosenClassUrl);

      setTimeout(() => {
        this.setState({
          loading: false
        });
      }, 2000);
    }
    else {
      this.setState({
        loading: false
      });

      return;
    }
  }

  render() {
    const { cards } = this.props;
    const { loading } = this.state;
    const loader = <LoadingRing color="#2c82c9" />;

    return (
      <div className="container cards-container" ref="myscroll">
        { cards && cards.length === 0 ? loader : <div className="row gallery-container">{this.renderCards()}</div> }
        { loading ? loader : "" }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cards: state.cards.items,
});

const dispatchMapToProps = (dispatch) => ({
  fetchAllCards: (customUrl) => dispatch(fetchAllCards(customUrl)),
});

export default connect(mapStateToProps, dispatchMapToProps)(CardsList);
