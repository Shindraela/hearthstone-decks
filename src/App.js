import React from 'react';
import { connect } from 'react-redux';
import { fetchAllCards } from './actions/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ContentContainer from './components/ContentContainer';
import LoadingRing from './components/LoadingRing';
import './css/App.css';
import './css/Tablet.css';
import './css/Laptop.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage && localStorage.length > 0 ? localStorage.getItem('username') : null,
      selectedClass: localStorage && localStorage.length > 0 ? localStorage.getItem('selectedClass') : null
    }

    if (window.performance) {
      if (performance.navigation.type === 1) {
        this.checkConnectedAlready();
      }
    }
  }

  checkConnectedAlready() {
    const { fetchAllCards } = this.props;
    const { username, selectedClass } = this.state;
    const chosenClassUrl = `https://us.api.blizzard.com/hearthstone/cards?locale=fr_FR&class=${selectedClass}`;

    if(username && selectedClass) {
      return fetchAllCards(chosenClassUrl);
    }
  }

  render() {
    const { cards } = this.props;
    const loader = <LoadingRing color="#2c82c9" />;

    if(cards.error) return <div>Error</div>;

    if(cards.pending) return loader;

    return (
      <section className="wrapper">
        <Router basename="">
          <Route exact path="/"><ContentContainer cards={cards} /></Route>
        </Router>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  cards: state.cards.items,
});

const dispatchMapToProps = (dispatch) => ({
  fetchAllCards: (url) => dispatch(fetchAllCards(url)),
});

export default connect(mapStateToProps, dispatchMapToProps)(App);
