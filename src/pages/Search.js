import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      buttonDisabled: true,
    };

    this.inputChange = this.inputChange.bind(this);
    this.buttonCheck = this.buttonCheck.bind(this);
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
      },
      () => {
        this.buttonCheck();
      },
    );
  }

  render() {
    const { artistName, buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
