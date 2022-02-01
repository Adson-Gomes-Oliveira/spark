import React, { Component } from 'react';
import Logo from '../assets/logo_Spark_negative.svg';
import { getUser } from '../services/userAPI';
import './styles/Header.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      load: false,
    };
  }

  componentDidMount() {
    this.getNameFromApi();
  }

  getNameFromApi = async () => {
    const nameOfUser = await getUser();
    const { name } = nameOfUser;
    this.setState({ username: name });
    this.setState({ load: true });
  }

  render() {
    const { username, load } = this.state;
    return (
      <header data-testid="header-component">
        <div className="main-header">
          <div className="logo-header">
            <img src={ Logo } alt="Logo Spark" />
            <span className="material-icons"> headphones </span>
          </div>
          <div className="user-label">
            <span className="material-icons"> account_circle </span>
            <span data-testid="header-user-name">
              {load === false
                ? 'Carregando...' : username}
            </span>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
