import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { updateUser, getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
      email: '',
      imagem: '',
      description: '',
      isLoading: false,
      userInfo: {},
      buttonDisabled: true,
      finish: false,
    };

    this.inputChange = this.inputChange.bind(this);
    this.buttonCheck = this.buttonCheck.bind(this);
    this.emailCheck = this.emailCheck.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.objectUser = this.objectUser.bind(this);
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    this.setState({
      text: user.name,
      email: user.email,
      imagem: user.image,
      description: user.description,
      isLoading: false,
      userInfo: user,
    });
  }

  componentWillUnmount() {
    this.setState({
      buttonDisabled: true,
      finish: false,
    });
  }

  async handleClick() {
    const object = this.objectUser();
    this.setState({
      isLoading: true,
    });
    await updateUser(object);
    this.setState({
      isLoading: false,
      finish: true,
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

  emailCheck(email) {
    return !!(email.includes('@') === true
         || email.includes('.') === true);
  }

  buttonCheck() {
    const { text, email, imagem, description } = this.state;
    const userV = text.length === 0;
    const emailV = email.length === 0;
    const imagemV = imagem.length === 0;
    const descriptionV = description.length === 0;
    const emailCheck = !(this.emailCheck(email));
    const validationLength = userV || emailV || imagemV || descriptionV;
    const validation = validationLength || emailCheck;
    this.setState({
      buttonDisabled: validation,
    });
  }

  objectUser() {
    const { text, email, imagem, description, userInfo } = this.state;
    const newObject = userInfo;
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
      isLoading,
      buttonDisabled,
      finish,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            <h1>ProfileEdit</h1>
            <form>
              <input
                data-testid="edit-input-name"
                type="text"
                id="text"
                name="text"
                value={ text }
                onChange={ this.inputChange }
              />
              <input
                data-testid="edit-input-email"
                type="email"
                id="email"
                name="email"
                value={ email }
                onChange={ this.inputChange }
              />
              <input
                data-testid="edit-input-image"
                type="text"
                id="imagem"
                name="imagem"
                value={ imagem }
                onChange={ this.inputChange }
              />
              <textarea
                data-testid="edit-input-description"
                id="description"
                name="description"
                value={ description }
                onChange={ this.inputChange }
              />
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ buttonDisabled }
                onClick={ this.handleClick }
              >
                Editar perfil
              </button>
            </form>
          </div>
        )}
        <Switch>
          { finish && <Redirect to="/profile" />}
        </Switch>
      </div>
    );
  }
}

export default ProfileEdit;
