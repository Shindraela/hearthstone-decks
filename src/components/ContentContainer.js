import React from 'react';
import Home from './Home';
import CardsList from './CardsList';

export class ContentContainer extends React.Component {
  render() {
    const { cards } = this.props;
    console.log("cards :", cards);
    const username = localStorage.getItem('username');
    const selectedClass = localStorage.getItem('selectedClass');

    return (
      <div>
        {
          username && selectedClass ? <CardsList cards={cards} /> : <Home />
        }
      </div>
    )
  }
}

export default ContentContainer;
