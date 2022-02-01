import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../assets/logo_Spark.svg';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './styles/Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      status: true,
      inputValue: '',
      load: false,
      redirect: false,
    };
  }

  handleClickButton = async () => {
    const { inputValue } = this.state;
    this.setState({ load: true });
    await createUser({ name: inputValue });
    this.setState({ redirect: true });
  }

  handleChangeInput = (event) => {
    const { value } = event.target;
    this.setState({ inputValue: value }, () => {
      const { inputValue } = this.state;
      const controlValidation = 3;
      const validationButton = inputValue.length < controlValidation;
      this.setState({ status: validationButton });
    });
  }

  render() {
    const { status, inputValue, load, redirect } = this.state;

    if (redirect === true) {
      return <Redirect to="/search" />;
    }

    return (
      load === false ? (
        <section data-testid="page-login" className="section-login">
          <div>
            <img className="logo-spark" src={ Logo } alt="Spark Logo" />
            <form className="login-area">
              <input
                type="text"
                placeholder="Nome (3 ou mais Caracteres)..."
                data-testid="login-name-input"
                onChange={ this.handleChangeInput }
                value={ inputValue }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                onClick={ this.handleClickButton }
                disabled={ status }
              >
                Entrar
              </button>
            </form>
          </div>
        </section>
      ) : <Loading />
    );
  }
}

export default Login;
