import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      userInfo: {},
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    this.setState({
      isLoading: false,
      userInfo: user,
    });
  }

  render() {
    const { isLoading, userInfo } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <Loading /> : (
          <div>
            <h1>Profile</h1>
            <h2>{ userInfo.name }</h2>
            <img
              src={ userInfo.image }
              alt={ userInfo.name }
              data-testid="profile-image"
            />
            <h3>{ userInfo.email }</h3>
            <p>{ userInfo.description }</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
