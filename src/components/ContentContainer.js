import React from 'react';
import Home from './Home';
import CardsList from './CardsList';
import LoadingRing from './LoadingRing';
import SelectOptions from './SelectOptions';
import { connect } from 'react-redux';
import { fetchAllCards } from '../actions/index';

export class ContentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage && localStorage.length > 0 ? localStorage.getItem('username') : null,
      selectedClass: localStorage && localStorage.length > 0 ? localStorage.getItem('selectedClass') : null,
      term : null,
      type: null,
      value: null
    }

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleMultiOptions = async (type, value) => {
    const { fetchAllCards } = this.props;
    const { selectedClass } = this.state;
    let url = null;
    let currentType = null;

    // FIX : need to add not only one, but multiple options on URL
    if(type === "cardSetOptions") {
      currentType = value ? "set" : "";
      url = (`https://api.blizzard.com/hearthstone/cards?class=${selectedClass}%2Cneutral&collectible=1&deckFormat=standard&multiClass=${selectedClass}&order=asc&pageSize=40&page=1&${currentType}=${value}&sort=manaCost&locale=fr_FR`);
    }
    
    if(type === "manaOptions") {
      currentType = value ? "manaCost" : "";
      url = (`https://api.blizzard.com/hearthstone/cards?class=${selectedClass}%2Cneutral&collectible=1&deckFormat=standard&${currentType}=${value}&multiClass=${selectedClass}&order=asc&pageSize=40&page=1&sort=manaCost&locale=fr_FR`);
    }
    
    if(type === "healthOptions") {
      currentType = value ? "health" : "";
      url = (`https://api.blizzard.com/hearthstone/cards?class=${selectedClass}%2Cneutral&collectible=1&deckFormat=standard&multiClass=${selectedClass}&order=asc&pageSize=40&page=1&sort=manaCost&${currentType}=${value}&locale=fr_FR`);
    }
    
    if(type === "typeOptions") {
      currentType = value ? "type" : "";
      url = (`https://api.blizzard.com/hearthstone/cards?class=${selectedClass}%2Cneutral&collectible=1&deckFormat=standard&multiClass=${selectedClass}&order=asc&pageSize=40&page=1&sort=manaCost&${currentType}=${value}&locale=fr_FR`);
    }
    
    if(type === "rarityOptions") {
      currentType = value ? "rarity" : "";
      url = (`https://api.blizzard.com/hearthstone/cards?class=${selectedClass}%2Cneutral&collectible=1&deckFormat=standard&multiClass=${selectedClass}&order=asc&pageSize=40&page=1&sort=manaCost&${currentType}=${value}&locale=fr_FR`);
    }
    
    if(type === "minionOptions") {
      currentType = value ? "minionType" : "";
      url = (`https://api.blizzard.com/hearthstone/cards?class=${selectedClass}%2Cneutral&collectible=1&deckFormat=standard&multiClass=${selectedClass}&order=asc&pageSize=40&page=1&sort=manaCost&${currentType}=${value}&locale=fr_FR`);
    }
    
    if(type === "keywordsOptions") {
      currentType = value ? "keyword" : "";
      url = (`https://api.blizzard.com/hearthstone/cards?class=${selectedClass}%2Cneutral&collectible=1&deckFormat=standard&multiClass=${selectedClass}&order=asc&pageSize=40&page=1&sort=manaCost&${currentType}=${value}&locale=fr_FR`);
    }

    this.setState({
      type: currentType,
      value: value
    });

    console.log("url :", url);
    return fetchAllCards(url);
  }

  handleOnChange = async (type, value) => {
    await this.handleMultiOptions(type, value);
  };

  render() {
    const { cards, page, pageCount } = this.props;
    const { type, value } = this.state;
    const username = localStorage.getItem('username');
    const selectedClass = localStorage.getItem('selectedClass');
    const currentAccessToken = localStorage.getItem('accessToken');
    const loader = <LoadingRing color="#2c82c9" />;
    const cardSetOptions = [
      {value: 'standard', label: 'Standard Cards'},
      {value: 'demonhunter-initiate', label: 'Demon Hunter Initiate'},
      {value: 'ashes-of-outland', label: 'Ashes of Outland'},
      {value: 'galakronds-awakening', label: 'Galakronds Awakening'},
      {value: 'descent-of-dragons', label: 'Descent of Dragons'},
      {value: 'saviors-of-uldum', label: 'Saviors of Uldum'},
      {value: 'rise-of-shadows', label: 'Rise of Shadows'},
      {value: 'classic', label: 'Classic'},
      {value: 'basic', label: 'Basic'}
    ];
    const manaOptions = [
      {value: '', label: 'Any Cost'},
      {value: '0', label: 'Mana: 0'},
      {value: '1', label: 'Mana: 1'},
      {value: '2', label: 'Mana: 2'},
      {value: '3', label: 'Mana: 3'},
      {value: '4', label: 'Mana: 4'},
      {value: '5', label: 'Mana: 5'},
      {value: '6', label: 'Mana: 6'},
      {value: '7', label: 'Mana: 7'},
      {value: '8', label: 'Mana: 8'},
      {value: '9', label: 'Mana: 9'},
      {value: '10', label: 'Mana: 10+'}
    ];
    const healthOptions = [
      {value: '', label: 'Any Health'},
      {value: '0', label: 'Health: 0'},
      {value: '1', label: 'Health: 1'},
      {value: '2', label: 'Health: 2'},
      {value: '3', label: 'Health: 3'},
      {value: '4', label: 'Health: 4'},
      {value: '5', label: 'Health: 5'},
      {value: '6', label: 'Health: 6'},
      {value: '7', label: 'Health: 7'},
      {value: '8', label: 'Health: 8'},
      {value: '9', label: 'Health: 9'},
      {value: '10', label: 'Health: 10+'}
    ];
    const typeOptions = [
      {value: '', label: 'Any types'},
      {value: 'hero', label: 'Hero'},
      {value: 'minion', label: 'Minion'},
      {value: 'spell', label: 'Spell'},
      {value: 'weapon', label: 'Weapon'}
    ];
    const rarityOptions = [
      {value: '', label: 'Any rarity'},
      {value: 'common', label: 'Common'},
      {value: 'free', label: 'Free'},
      {value: 'rare', label: 'Rare'},
      {value: 'epic', label: 'Epic'},
      {value: 'legendary', label: 'Legendary'}
    ];
    const minionOptions = [
      {value: '', label: 'Any minion'},
      {value: 'all', label: 'All'},
      {value: 'beast', label: 'Beast'},
      {value: 'demon', label: 'Demon'},
      {value: 'dragon', label: 'Dragon'},
      {value: 'elemental', label: 'Elemental'},
      {value: 'mech', label: 'Mech'},
      {value: 'murloc', label: 'Murloc'},
      {value: 'pirate', label: 'Pirate'},
      {value: 'totem', label: 'Totem'}
    ];
    const keywordsOptions = [
      {value: '', label: 'Any Keyword'},
      {value: 'adapt', label: 'Adapt'},
      {value: 'battlecry', label: 'Battlecry'},
      {value: 'charge', label: 'Charge'},
      {value: 'combo', label: 'Combo'},
      {value: 'counter', label: 'Counter'},
      {value: 'deathrattle', label: 'Deathrattle'},
      {value: 'discover', label: 'Discover'},
      {value: 'divine-shield', label: 'Divine Shield'},
      {value: 'echo', label: 'Echo'}
    ];

    return (
      <div>
        <SelectOptions options={cardSetOptions} onChange={(e) => this.handleOnChange("cardSetOptions", e.value)} />
        <SelectOptions options={manaOptions} onChange={(e) => this.handleOnChange("manaOptions", e.value)} />
        <SelectOptions options={healthOptions} onChange={(e) => this.handleOnChange("healthOptions", e.value)} />
        <SelectOptions options={typeOptions} onChange={(e) => this.handleOnChange("typeOptions", e.value)} />
        <SelectOptions options={rarityOptions} onChange={(e) => this.handleOnChange("rarityOptions", e.value)} />
        <SelectOptions options={minionOptions} onChange={(e) => this.handleOnChange("minionOptions", e.value)} />
        <SelectOptions options={keywordsOptions} onChange={(e) => this.handleOnChange("keywordsOptions", e.value)} />

        {
          !username && !selectedClass ? <Home /> :
          !username && !selectedClass && !currentAccessToken ? <Home /> :
          username && selectedClass && cards && cards.length === 0 ? <Home /> :
          cards && cards.length > 0 ? <CardsList cards={cards} page={page} pageCount={pageCount} type={type} value={value} /> : loader
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cards: state.cards.items,
  page: state.cards.page,
  pageCount: state.cards.pageCount,
  filtered: state.cards.filtered,
  currentUrl: state.cards.currentUrl
});

const dispatchMapToProps = (dispatch) => ({
  fetchAllCards: (url) => dispatch(fetchAllCards(url)),
});

export default connect(mapStateToProps, dispatchMapToProps)(ContentContainer);
