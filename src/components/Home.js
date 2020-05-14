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

export class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      username: localStorage.getItem('myValueInLocalStorage') || "",
      playableClasses: [
        {
          'class': 'Warrior',
          'picture': warrior
        },
        {
          'class': 'Paladin',
          'picture': paladin
        },
        {
          'class': 'Hunter',
          'picture': hunter
        },
        {
          'class': 'Rogue',
          'picture': rogue
        },
        {
          'class': 'Priest',
          'picture': priest
        },
        {
          'class': 'Shaman',
          'picture': shaman
        },
        {
          'class': 'Mage',
          'picture': mage
        },
        {
          'class': 'Warlock',
          'picture': warlock
        },
        {
          'class': 'Druid',
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
      <div className="image-container" key={index}>
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
    const chosenClassUrl = `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/${chosenClass}?locale=frFR`;
    localStorage.setItem('selectedClass', chosenClass);

    this.setState({
      selectedClass: chosenClass
    });

    return fetchAllCards(chosenClassUrl);
  }

  render() {
    const { username } = this.state;

    return (
      <section className="gallery-container">
        <div className="form-group">
          <h2 className="pseudo-style">Choose your username</h2>
          <input name="username" type="text" className="form-control search-input" value={username} onChange={this.getValue} />
        </div>

        <div>
          <h2 className="class-style">Choose your class</h2>
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
