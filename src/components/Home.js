import React from 'react';
import { connect } from 'react-redux';
import { fetchAllCards } from '../actions/index';
import warrior from '../assets/warrior.jpg';
import paladin from '../assets/paladin.jpg';
import hunter from '../assets/hunter.jpg';
import rogue from '../assets/rogue.jpg';
import priest from '../assets/priest.jpg';
import shaman from '../assets/shaman.jpg';
import mage from '../assets/mage.jpg';
import warlock from '../assets/warlock.jpg';
import druid from '../assets/druid.jpg';
import hearthstone from '../assets/hearthstone_logo.png';

export class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      username: localStorage.getItem('myValueInLocalStorage') || "",
      playableClasses: [
        {
          'class': 'warrior',
          'picture': warrior
        },
        {
          'class': 'paladin',
          'picture': paladin
        },
        {
          'class': 'hunter',
          'picture': hunter
        },
        {
          'class': 'rogue',
          'picture': rogue
        },
        {
          'class': 'priest',
          'picture': priest
        },
        {
          'class': 'shaman',
          'picture': shaman
        },
        {
          'class': 'mage',
          'picture': mage
        },
        {
          'class': 'warlock',
          'picture': warlock
        },
        {
          'class': 'druid',
          'picture': druid
        }
      ],
      selectedClass: ""
    }

    this.getValue = this.getValue.bind(this);
  }

  getValue = (event) => {
    const currentUsername = event.target.value;
    localStorage.setItem('username', currentUsername);

    this.setState({
      username: currentUsername
    });
  }

  renderPlayableClasses() {
    const { playableClasses } = this.state;

    return playableClasses.map((playableClass, index) => (
      <div className="image-container class-container" key={index}>
        <img src={playableClass.picture} className="responsive" alt="img" />
        <div className="hover-text">
          <button type="button" className="btn" onClick={() => this.chooseClass(playableClass.class)}>
            <span className="text">{playableClass.class}</span>
          </button>
        </div>
      </div>
    ));
  }

  chooseClass(chosenClass) {
    const { fetchAllCards } = this.props;
    const chosenClassUrl = `https://us.api.blizzard.com/hearthstone/cards?locale=fr_FR&class=${chosenClass}`;
    localStorage.setItem('selectedClass', chosenClass);

    this.setState({
      selectedClass: chosenClass
    });

    return fetchAllCards(chosenClassUrl);
  }

  render() {
    const { username } = this.state;

    return (
      <section className="home-container">
        <img src={hearthstone} alt="hearthstone logo" className="hearthstone-logo" />

        <div className="form-group">
          <h3 className="username-title">Choose your username</h3>
          <input name="username" type="text" className="form-control search-input" value={username} onChange={this.getValue} />
        </div>

        <div className="classes-container">
          <h3 className="class-title">Choose your class</h3>
          <div className="all-images">
            {this.renderPlayableClasses()}
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  cards: state.cards.items,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllCards: (url) => dispatch(fetchAllCards(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
