import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistInformation: {},
      fullAlbum: [],
    };

    this.albumList = this.albumList.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    const albumList = this.albumList(album);
    this.setState({
      artistInformation: album[0],
      fullAlbum: albumList,
    });
    console.log(album);
  }

  albumList(apiObject) {
    const newArray = [];
    for (let index = 1; index < apiObject.length; index += 1) {
      newArray.push(apiObject[index]);
    }
    return newArray;
  }

  render() {
    const { fullAlbum, artistInformation } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="album-name">{artistInformation.collectionName}</h1>
        <h2 data-testid="artist-name">{artistInformation.artistName}</h2>
        { fullAlbum.map((music) => (
          <MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
