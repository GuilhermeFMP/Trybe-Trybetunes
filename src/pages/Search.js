import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      buttonDisabled: true,
      loading: false,
      search: '',
      searchFinished: false,
      albuns: [],
      notFound: false,
    };

    this.inputChange = this.inputChange.bind(this);
    this.buttonCheck = this.buttonCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.albumList = this.albumList.bind(this);
  }

  async handleClick() {
    const { search } = this.state;
    this.setState({
      artistName: '',
      loading: true,
      searchFinished: false,
      notFound: false,
    });
    const allAlbuns = await searchAlbumsAPI(search);
    this.setState({
      loading: false,
      searchFinished: true,
      albuns: allAlbuns,
    }, () => {
      this.albumList();
    });
  }

  albumList() {
    const { albuns } = this.state;
    if (albuns.length === 0) {
      this.setState({
        notFound: true,
      });
    }
  }

  buttonCheck() {
    const { artistName } = this.state;
    const MIN_CHARACTERS = 2;
    const validation = artistName.length >= MIN_CHARACTERS;
    this.setState({
      buttonDisabled: !validation,
    });
  }

  inputChange(event) {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
        search: value,
      },
      () => {
        this.buttonCheck();
      },
    );
  }

  render() {
    const {
      artistName,
      buttonDisabled,
      loading,
      searchFinished,
      search,
      albuns,
      notFound,
    } = this.state;
    const divNotFound = <h3>Nenhum álbum foi encontrado</h3>;
    const trully = searchFinished && artistName.length === 0;
    const trully2 = notFound && artistName.length === 0;
    const result = (
      <h3>
        Resultado de álbuns de:
        {' '}
        { search }
      </h3>);
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <input
              type="text"
              placeholder="Nome do Artista"
              data-testid="search-artist-input"
              name="artistName"
              value={ artistName }
              onChange={ this.inputChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
        )}
        { trully && result }
        { trully2 && divNotFound }
        { albuns.map((album) => (
          <div key={ album.id }>
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <h5>{album.collectionName}</h5>
            <p>{album.artistName}</p>
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              Clique
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
