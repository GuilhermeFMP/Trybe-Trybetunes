import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
      email: '',
      imagem: '',
      description: '',
      buttonDisabled: true,
      itsLoading: false,
      redirect: false,
    };

    this.inputChange = this.inputChange.bind(this);
    this.buttonCheck = this.buttonCheck.bind(this);
    this.objectUser = this.objectUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    this.setState({
      itsLoading: true,
    });
    await createUser(this.objectUser());
    this.setState({
      itsLoading: false,
      redirect: true,
    });
  }

  buttonCheck() {
    const { text } = this.state;
    const MIN_CHARACTERS = 3;
    const validation = text.length >= MIN_CHARACTERS;
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

  objectUser() {
    const { text, email, imagem, description } = this.state;
    const newObject = {
      name: '',
      email: '',
      image: '',
      description: '',
    };
    newObject.name = text;
    newObject.email = email;
    newObject.image = imagem;
    newObject.description = description;
    return newObject;
  }

  render() {
    const {
      text,
      imagem,
      email,
      description,
      buttonDisabled,
      itsLoading,
      redirect,
    } = this.state;
    return (
      <div data-testid="page-login">
        { itsLoading ? <Loading /> : (
          <div>
            <h1>Login</h1>
            <form>
              <label htmlFor="text">
                UserName:
                <input
                  type="text"
                  id="text"
                  name="text"
                  value={ text }
                  onChange={ this.inputChange }
                  data-testid="login-name-input"
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={ email }
                  onChange={ this.inputChange }
                />
              </label>
              <label htmlFor="imagem">
                Imagem URL:
                <input
                  type="text"
                  id="imagem"
                  name="imagem"
                  value={ imagem }
                  onChange={ this.inputChange }
                />
              </label>
              <label htmlFor="description">
                Descrição:
                <textarea
                  id="description"
                  name="description"
                  value={ description }
                  onChange={ this.inputChange }
                />
              </label>
              <button
                type="button"
                disabled={ buttonDisabled }
                onClick={ this.handleClick }
                data-testid="login-submit-button"
              >
                Entrar
              </button>
            </form>
          </div>
        )}
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
