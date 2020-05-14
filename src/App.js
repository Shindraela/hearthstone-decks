import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ContentContainer from './components/ContentContainer';
import './css/App.css';
import './css/Tablet.css';
import './css/Laptop.css';

class App extends React.Component {
  render() {
    const { cards } = this.props;

    if(cards.error) return <div>Error</div>;

    if(cards.pending) return <div>Loading...</div>;

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

export default connect(mapStateToProps)(App);
