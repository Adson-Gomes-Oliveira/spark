import React, { Component } from 'react';
import Header from './Header';

class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <section data-testid="page-profile">
          <h1>Profile</h1>
        </section>
      </>
    );
  }
}

export default Profile;
