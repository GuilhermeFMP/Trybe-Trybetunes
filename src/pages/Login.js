import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
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
    const { text } = this.state;
    const newObject = {
      name: '',
    };
    newObject.name = text;
    return newObject;
  }

  render() {
    const { text, buttonDisabled, itsLoading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        { itsLoading ? <Loading /> : (
          <div>
            <h1>Login</h1>
            <form>
              <label htmlFor="text">
                <input
                  type="text"
                  id="text"
                  name="text"
                  value={ text }
                  onChange={ this.inputChange }
                  data-testid="login-name-input"
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
