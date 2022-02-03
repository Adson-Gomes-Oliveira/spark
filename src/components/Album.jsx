import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import LoadingComponent from './LoadingComponent';
import { addSong } from '../services/favoriteSongsAPI';
import './styles/Album.css';
import MusicCard from './MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musicsToBeListed: [],
      artistAlbumInfos: {},
      load: false,
    };
  }

  componentDidMount() {
    this.getMusicsFromAlbum();
  }

  handleClickCheck = async (event, music) => {
    const { checked } = event.target;

    if (checked) {
      this.setState({ load: true });
      await addSong(music);
      this.setState({ load: false });
    }
  }

  getMusicsFromAlbum = async () => {
    const { match } = this.props;
    const { params } = match;
    const promise = await getMusics(params.id);
    this.setState({ artistAlbumInfos: promise[0] });
    this.setState({ musicsToBeListed: promise });
  }

  render() {
    const { musicsToBeListed, artistAlbumInfos, load, check } = this.state;
    const { artistName, artworkUrl100, collectionName } = artistAlbumInfos;
    const list = musicsToBeListed.slice(1);

    return (
      <>
        {load && <LoadingComponent />}
        <Header />
        <section data-testid="page-album" className="page-album">
          <div className="infos">
            <img src={ artworkUrl100 } alt={ collectionName } />
            <span data-testid="album-name">{collectionName}</span>
            <span data-testid="artist-name">{artistName}</span>
          </div>
          <div className="musics">
            <MusicCard
              list={ list }
              handleClickCheck={ this.handleClickCheck }
            />
          </div>
        </section>
        )
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape.isRequired,
};

export default Album;
