import React, { Component } from 'react';
import Logo from '../assets/logo_Spark.svg';
import './styles/Loading.css';

class Loading extends Component {
  render() {
    return (
      <section className="loading-screen">
        <img src={ Logo } alt="Logo Spark" />
        <span>Carregando...</span>
      </section>
    );
  }
}

export default Loading;
