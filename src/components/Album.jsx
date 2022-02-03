import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './Header';
import './styles/Album.css';
import MusicCard from './MusicCard';

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
    const sliceList = musicsToBeListed.slice(1);
    const musicList = sliceList.map((music) => (<MusicCard
      key={ music.trackId }
      id={ music.trackId }
      title={ music.trackName }
      preview={ music.previewUrl }
      allInfos={ music }
    />));

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
            {musicList}
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
