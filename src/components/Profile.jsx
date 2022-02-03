import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './Header';
import Loading from './Loading';
import './styles/Profile.css';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userInfos: {},
      load: true,
    };
  }

  componentDidMount() {
    this.getUserInfos();
  }

  getUserInfos = async () => {
    const data = await getUser();
    this.setState({ userInfos: data });
    this.setState({ load: false });
  }

  render() {
    const { userInfos, load } = this.state;
    const { description, email, image, name } = userInfos;
    return (
      <>
        <Header />
        {load ? <Loading /> : (
          <section data-testid="page-profile" className="page-profile">
            <div className="profile">
              <div className="edit">
                <img data-testid="profile-image" src={ image } alt={ name } />
                <Link to="/profile/edit">
                  <button type="button">Editar perfil</button>
                </Link>
              </div>
              <span className="user-name">
                Nome
                <span>{name}</span>
              </span>
              <span className="user-email">
                Email
                <span>{email}</span>
              </span>
              <span className="user-description">
                Descrição
                <p>{description}</p>
              </span>
            </div>
          </section>
        )}
      </>
    );
  }
}

export default Profile;
