import React, { Component } from 'react';
import Header from './Header';
import './styles/Search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      status: true,
    };
  }

  handleClickChange = () => {

  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ inputValue: value }, () => {
      const { inputValue } = this.state;
      const controlValidation = 2;
      const validationButton = inputValue.length < controlValidation;
      this.setState({ status: validationButton });
    });
  }

  render() {
    const { inputValue, status } = this.state;
    return (
      <>
        <Header />
        <section data-testid="page-search" className="page-search">
          <form className="search-area">
            <label htmlFor="search" className="material-icons">
              <input
                id="search"
                type="text"
                placeholder="Musica, album ou artista"
                data-testid="search-artist-input"
                onChange={ this.handleInputChange }
                value={ inputValue }
              />
              search
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ status }
              onClick={ this.handleClickChange }
            >
              Procurar
            </button>
          </form>
        </section>
      </>
    );
  }
}

export default Search;
