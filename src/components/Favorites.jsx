import React, { Component } from 'react';
import Header from './Header';

class Favorite extends Component {
  render() {
    return (
      <>
        <Header />
        <section data-testid="page-favorites">
          <h1>Favorites</h1>
        </section>
      </>
    );
  }
}

export default Favorite;
