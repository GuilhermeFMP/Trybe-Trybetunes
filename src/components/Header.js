import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      username: '',
    };

    this.takeUser = this.takeUser.bind(this);
  }

  componentDidMount() {
    this.takeUser();
  }

  async takeUser() {
    this.setState({
      loading: true,
    });
    let user = {};
    user = await getUser();
    this.setState({
      loading: false,
      username: user.name,
    });
  }

  render() {
    const { username, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : <h1 data-testid="header-user-name">{ username }</h1>}
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
