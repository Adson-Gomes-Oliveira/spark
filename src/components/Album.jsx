import React, { Component } from 'react';
import Header from './Header';

class Album extends Component {
  render() {
    return (
      <>
        <Header />
        <section data-testid="page-album">
          <h1>Album</h1>
        </section>
      </>
    );
  }
}

export default Album;
