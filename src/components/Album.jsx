import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musicsToBeListed: [],
      artistAlbumInfos: {},
    };
  }

  componentDidMount() {
    this.getMusicsFromAlbum();
  }

  getMusicsFromAlbum = async () => {
    const { match } = this.props;
    const { params } = match;
    const promise = await getMusics(params.id);
    this.setState({ artistAlbumInfos: promise[0] });
    this.setState({ musicsToBeListed: promise });
  }

  render() {
    const { musicsToBeListed, artistAlbumInfos } = this.state;
    const { artistName, artworkUrl100, collectionName } = artistAlbumInfos;
    const list = musicsToBeListed.slice(1);
    const musicsList = list.map((music) => {
      const { trackName, previewUrl } = music;
      return (
        <li key={ trackName }>
          <span>{trackName}</span>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </li>
      );
    });
    return (
      <>
        <Header />
        <section data-testid="page-album" className="page-album">
          <div className="infos">
            <img src={ artworkUrl100 } alt={ collectionName } />
            <span data-testid="album-name">{collectionName}</span>
            <span data-testid="artist-name">{artistName}</span>
          </div>
          <div className="musics">
            <ul>{musicsList}</ul>
          </div>
        </section>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape.isRequired,
};

export default Album;
