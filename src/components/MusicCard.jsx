import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles/MusicCardAlbum.css';

class MusicCard extends Component {
  render() {
    const { list, handleClickCheck, check } = this.props;
    const musicsList = list.map((music) => {
      const { trackId, trackName, previewUrl } = music;
      return (
        <>
          <div className="divisor-musics" />
          <li className="music" key={ trackName }>
            <span>{trackName}</span>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="favorite">
              <input
                id={ trackId }
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onClick={ (event) => handleClickCheck(event, music) }
                checked={ check }
              />
              Favorita
            </label>
          </li>
          <div className="divisor-musics" />
        </>
      );
    });

    return (
      <ul className="music-list" id="music-list">
        {musicsList}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  check: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf.isRequired,
  handleClickCheck: PropTypes.func.isRequired,
};

export default MusicCard;
