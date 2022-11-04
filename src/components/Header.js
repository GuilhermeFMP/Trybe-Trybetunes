import React from 'react';
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
      </header>
    );
  }
}

export default Header;
