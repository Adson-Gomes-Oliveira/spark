import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './Header';
import LoadingComponent from './LoadingComponent';
import './styles/Search.css';
import './styles/CardAlbum.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      status: true,
      load: false,
      albums: [],
      artistSearched: '',
      failMessage: '',
    };
  }

  handleClickChange = async () => {
    const { inputValue } = this.state;
    this.setState({ load: true });
    const query = inputValue;
    this.setState({ artistSearched: query });
    this.setState({ inputValue: '' });
    const promise = await searchAlbumsAPI(query);
    this.setState({ albums: promise });
    this.setState({ failMessage: 'Nenhum álbum foi encontrado' });
    this.setState({ load: false });
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
    const { inputValue, status, load, albums, failMessage, artistSearched } = this.state;
    const listOfAlbums = albums.map((album) => {
      const {
        artistName,
        collectionId,
        collectionName,
        artworkUrl100,
      } = album;
      return (
        <Link
          key={ collectionName }
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
          className="album-link"
        >
          <li
            className="card-album"
            style={ { backgroundImage: `url(${artworkUrl100})` } }
          >
            <div className="infos">
              <span>{collectionName}</span>
              <span>{artistName}</span>
            </div>
          </li>
        </Link>
      );
    });

    return (
      <>
        <Header />
        <section data-testid="page-search" className="page-search">
          <form className="search-area">
            <label htmlFor="search" className="material-icons">
              <input
                id="search"
                type="text"
                placeholder="Album, artista ou banda"
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
          {load === true ? <LoadingComponent /> : (
            <div className="album-area">
              {albums.length < 1
                ? <span>{failMessage}</span>
                : (
                  <>
                    <h3>
                      {`Resultado de álbuns de: ${artistSearched}`}
                    </h3>
                    <ul className="albuns-list">{listOfAlbums}</ul>
                  </>
                )}
            </div>
          )}
        </section>
      </>
    );
  }
}

export default Search;
