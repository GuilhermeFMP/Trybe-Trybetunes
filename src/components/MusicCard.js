import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      itsChecked: false,
    };

    this.favoriteSong = this.favoriteSong.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  async componentDidMount() {
    const { trackName } = this.props;
    const favorites = await getFavoriteSongs();
    const check = favorites.map((favorite) => favorite.trackName);
    if (check.includes(trackName)) {
      this.setState({
        itsChecked: true,
      });
    }
  }

  onInputChange(event) {
    const { name } = event.target;
    const value = event.target.checked;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.favoriteSong();
      },
    );
  }

  async favoriteSong() {
    const { itsChecked } = this.state;
    const { musicObj } = this.props;
    if (itsChecked) {
      this.setState({
        isLoading: true,
      });
      await addSong(musicObj);
      this.setState({
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: true,
      });
      await removeSong(musicObj);
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { itsChecked, isLoading } = this.state;
    return (
      <div>
        { isLoading ? <Loading /> : (
          <div>
            <h4>{trackName}</h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="check">
              Favorita
              <input
                id="check"
                name="itsChecked"
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                checked={ itsChecked }
                onChange={ this.onInputChange }
              />
            </label>
          </div>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicObj: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MusicCard;
