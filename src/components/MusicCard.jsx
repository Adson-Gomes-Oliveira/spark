import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/MusicCardAlbum.css';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingComponentMusics from './LoadingComponentMusics';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      load: false,
      check: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getFavoritedSongs();
  }

  // Consultada a lógica do PR do Carlos Rosa para realização deste requisito (9):
  // https://github.com/tryber/sd-017-project-trybetunes/pull/111/commits/125690c1a1ed7feaccb3411fe897db0e005061cb
  getFavoritedSongs = async () => {
    const { id } = this.props;
    this.setState({ load: true });
    const recover = await getFavoriteSongs();
    this.setState({ load: false, favoriteSongs: recover }, () => {
      const { favoriteSongs } = this.state;
      favoriteSongs.forEach((music) => {
        if (music.trackId === id) {
          this.setState({ check: true });
        }
      });
    });
  }

  handleClickCheck = async (event, music) => {
    const { checked } = event.target;
    this.setState({ check: checked });
    this.setState({ load: true });
    await addSong(music);
    this.setState({ load: false });
  }

  render() {
    const { id, title, preview, allInfos } = this.props;
    const { load, check } = this.state;

    return (
      load ? <LoadingComponentMusics /> : (
        <>
          <div className="divisor-musics" />
          <li className="music">
            <span className="music-title">{title}</span>
            <div className="audio-favorite">
              <audio data-testid="audio-component" src={ preview } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label className="favorite" htmlFor={ id }>
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${id}` }
                  id={ id }
                  onClick={ (event) => this.handleClickCheck(event, allInfos) }
                  checked={ check }
                />
                <span className="material-icons"> favorite </span>
              </label>
            </div>
          </li>
          <div className="divisor-musics" />
        </>
      )
    );
  }
}

MusicCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  allInfos: PropTypes.shape.isRequired,
};

export default MusicCard;
