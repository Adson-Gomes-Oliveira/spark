import React, { Component } from 'react';
import Header from './Header';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './styles/Favorites.css';

class Favorite extends Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      check: true,
      load: false,
    };
  }

  componentDidMount() {
    this.getFavoritedSongs();
  }

  handleClickFavCheck = async (event, music) => {
    this.setState({ load: true });
    await removeSong(music);
    await this.getFavoritedSongs();
    this.setState({ load: false });
  }

  getFavoritedSongs = async () => {
    const recover = await getFavoriteSongs();
    this.setState({ favoriteSongs: recover });
  }

  render() {
    const { favoriteSongs, load, check } = this.state;
    const renderList = favoriteSongs.map((music) => {
      const {
        trackId: id,
        trackName: name,
        previewUrl: preview,
        artworkUrl100: art } = music;
      return (
        <li className="list-of-favorites" key={ id }>
          <div className="art-name">
            <img src={ art } alt={ name } />
            <span className="title">{name}</span>
          </div>
          <div className="audio-favorite">
            <audio data-testid="audio-component" src={ preview } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>

            <label
              className="favorite"
              data-testid={ `checkbox-music-${id}` }
              htmlFor={ id }
            >
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${id}` }
                id={ id }
                onClick={ (event) => this.handleClickFavCheck(event, music) }
                checked={ check }
              />
              <span className="material-icons"> favorite </span>
            </label>
          </div>
        </li>
      );
    });

    return (
      <>
        <Header />
        {load ? <Loading /> : (
          <section data-testid="page-favorites" className="page-favorites">
            <h3>Lista de Musicas Favoritas</h3>
            <ul className="musics-list">
              {renderList}
            </ul>
          </section>
        )}
      </>
    );
  }
}

export default Favorite;
