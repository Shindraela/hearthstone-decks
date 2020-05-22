import React from 'react';
import Home from './Home';
import CardsList from './CardsList';
import LoadingRing from './LoadingRing';

export class ContentContainer extends React.Component {
  render() {
    const { cards, pageCount } = this.props;
    const username = localStorage.getItem('username');
    const selectedClass = localStorage.getItem('selectedClass');
    const loader = <LoadingRing color="#2c82c9" />;

    return !username && !selectedClass ? <Home /> :
    username && selectedClass && cards && cards.length === 0 ? <Home /> :
    cards && cards.length > 0 ? <CardsList cards={cards} pageCount={pageCount} /> : loader;

    // return !username && !selectedClass ? <Home /> : cards && cards.length > 0 ? <CardsList cards={cards} /> : loader;
  }
}

export default ContentContainer;
