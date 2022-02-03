import React, { Component } from 'react';
import Logo from '../assets/logo_Spark.svg';
import './styles/LoadingComponentMusics.css';

class LoadingComponent extends Component {
  render() {
    return (
      <div className="loading-component-musics">
        <img src={ Logo } alt="Logo Spark" />
        <div className="divisor-h" />
        <span>Carregando...</span>
      </div>
    );
  }
}

export default LoadingComponent;
