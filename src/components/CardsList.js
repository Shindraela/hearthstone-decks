import React from 'react';
import Card from './Card';
import LoadingRing from './LoadingRing';
import uniqBy from 'lodash/uniqBy';
import { connect } from 'react-redux';
import { fetchAllCards } from '../actions/index';
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

export class CardsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      currentCards: [...props.cards],
      nextPage: 1
    }

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { cards, type, value } = this.props;

    if (cards !== prevProps.cards) {
      this.setNewCurrentCards(cards);

      if(type && value) {
        this.setFilteredCards(cards);
      } else {
        return;
      }
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

  setFilteredCards(newCards) {
    const { cards, type, value, page, pageCount } = this.props;
    const { currentCards } = this.state;

    // return type && value ? this.setState({ currentCards : [...newCards] }) : {}

    if(type && value) {
      this.setState({
        currentCards : [...newCards]
      });
      
      if (pageCount > 1 && page > 1) {
        this.setNewCurrentCards(cards);
      }
    }
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
  
  replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
  }

  loadMore() {
    const { pageCount, type, value } = this.props;
    const { nextPage } = this.state;
    const selectedClass = localStorage.getItem('selectedClass');
    const currentType = type ? type : "";
    const currentValue = value ? value : "";
    // console.log("type :", type);
    // console.log("value :", value);

    if(nextPage <= pageCount) {
      const { fetchAllCards } = this.props;

      this.setState({
        loading: true,
        nextPage: nextPage + 1
      });

      const filteredUrl = `https://api.blizzard.com/hearthstone/cards?class=${selectedClass}%2Cneutral&collectible=1&deckFormat=standard&multiClass=${selectedClass}&order=asc&pageSize=40&page=${this.state.nextPage}&set=standard&sort=manaCost&${currentType}=${currentValue}&locale=fr_FR`;
      const basicUrl = `https://api.blizzard.com/hearthstone/cards?class=${selectedClass}%2Cneutral&collectible=1&deckFormat=standard&multiClass=${selectedClass}&order=asc&pageSize=40&page=${this.state.nextPage}&set=standard&sort=manaCost&locale=fr_FR`;
      const setUrl = `https://api.blizzard.com/hearthstone/cards?class=${selectedClass}%2Cneutral&collectible=1&deckFormat=standard&multiClass=${selectedClass}&order=asc&pageSize=40&page=${this.state.nextPage}&set=${currentValue}&sort=manaCost&locale=fr_FR`;

      const chosenClassUrl = currentType && currentType !== "set" && currentValue ? filteredUrl : currentType === "set" ? setUrl : basicUrl;


      // console.log("chosenClassUrl :", chosenClassUrl);
      console.log("nextPage :", nextPage);
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
    const { cards, page , pageCount} = this.props;
    const { nextPage } = this.state;
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
