import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          </div>
          <div className="user-label">
            <span className="material-icons"> account_circle </span>
            <span data-testid="header-user-name">
              {load === false
                ? 'Carregando...' : username}
            </span>
          </div>
        </div>
        <div className="nav-header">
          <Link
            to="/search"
            data-testid="link-to-search"
            className="link"
            style={ { textDecoration: 'none', color: 'white' } }
          >
            <span>Pesquisar</span>
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link"
            style={ { textDecoration: 'none', color: 'white' } }
          >
            <span>Favoritas</span>
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="link"
            style={ { textDecoration: 'none', color: 'white' } }
          >
            <span>Perfil</span>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
