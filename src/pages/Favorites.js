import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      allMusics: [],
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const musics = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      allMusics: musics,
    });
  }

  async componentDidUpdate() {
    const musics = await getFavoriteSongs();
    this.setState({
      allMusics: musics,
    });
  }

  render() {
    const { isLoading, allMusics } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading /> : (
          allMusics.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              musicObj={ music }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
