import React, { Component } from 'react';
import Logo from '../assets/logo_Spark.svg';
import './styles/LoadingComponent.css';

class LoadingComponent extends Component {
  render() {
    return (
      <div className="loading-component">
        <img src={ Logo } alt="Logo Spark" />
        <span>Carregando...</span>
      </div>
    );
  }
}

export default LoadingComponent;
