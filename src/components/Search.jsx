import React, { Component } from 'react';
import Header from './Header';

class Search extends Component {
  render() {
    return (
      <>
        <Header />
        <section data-testid="page-search">
          <h1>Pesquisa</h1>
        </section>
      </>
    );
  }
}

export default Search;
