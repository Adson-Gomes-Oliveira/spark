import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';
import './styles/ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      load: true,
      nameValue: '',
      emailValue: '',
      descriptionValue: '',
      imageValue: '',
      disableButton: true,
      saveButtonText: 'Salvar',
    };
  }

  componentDidMount() {
    this.getUserInfos();
  }

  handleClickSave = async () => {
    this.setState({ saveButtonText: 'Salvando informações do perfil...' });
    const { nameValue, emailValue, descriptionValue, imageValue } = this.state;
    const { history } = this.props;
    const profileToSave = {
      name: nameValue,
      email: emailValue,
      description: descriptionValue,
      image: imageValue,
    };
    await updateUser(profileToSave);
    history.push('/profile');
  }

  validateForm = () => {
    const { nameValue, emailValue, descriptionValue, imageValue } = this.state;
    const arrOfValues = [nameValue, emailValue, descriptionValue, imageValue];
    const emailValidation = /\S+@\S+\.\S+/;
    if (
      !(arrOfValues.includes(''))
      && emailValidation.test(emailValue)
    ) {
      this.setState({ disableButton: false });
    }
  }

  handleChangeInput = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value }, this.validateForm());
  }

  getUserInfos = async () => {
    const data = await getUser();
    this.setState({ nameValue: data.name });
    this.setState({ emailValue: data.email });
    this.setState({ descriptionValue: data.description });
    this.setState({ imageValue: data.image });
    this.validateForm();
    this.setState({ load: false });
  }

  render() {
    const {
      load,
      nameValue,
      emailValue,
      descriptionValue,
      imageValue,
      disableButton,
      saveButtonText } = this.state;
    return (
      <>
        <Header />
        {load ? <Loading /> : (
          <section data-testid="page-profile-edit" className="page-profile-edit">
            <form>
              <label htmlFor="image" className="image-edit">
                <img src={ imageValue } alt={ nameValue } />
                <div className="image-link">
                  <span>Escolha um link de uma imagem para seu perfil</span>
                  <input
                    type="text"
                    id="imageValue"
                    data-testid="edit-input-image"
                    onChange={ this.handleChangeInput }
                    value={ imageValue }
                  />
                </div>
              </label>
              <label htmlFor="name">
                <span>Nome</span>
                <span>Fique à vontade para usar seu nome social</span>
                <input
                  type="text"
                  id="nameValue"
                  data-testid="edit-input-name"
                  onChange={ this.handleChangeInput }
                  value={ nameValue }
                />
              </label>
              <label htmlFor="email">
                <span>Email</span>
                <span>Escolha um email que consulte diariamente</span>
                <input
                  type="text"
                  id="emailValue"
                  data-testid="edit-input-email"
                  onChange={ this.handleChangeInput }
                  value={ emailValue }
                />
              </label>
              <label htmlFor="description">
                <span>Descrição</span>
                <span>Conte-nos um pouco sobre você! :D</span>
                <input
                  type="text"
                  id="descriptionValue"
                  data-testid="edit-input-description"
                  onChange={ this.handleChangeInput }
                  value={ descriptionValue }
                />
              </label>
              <button
                type="button"
                id="save"
                data-testid="edit-button-save"
                onClick={ this.handleClickSave }
                disabled={ disableButton }
              >
                {saveButtonText}
              </button>
            </form>
          </section>
        )}
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.func.isRequired,
};

export default ProfileEdit;
