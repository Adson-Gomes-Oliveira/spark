import React, { Component } from 'react';
import Header from './Header';

class ProfileEdit extends Component {
  render() {
    return (
      <>
        <Header />
        <section data-testid="page-profile-edit">
          <h1>Profile Edit</h1>
        </section>
      </>
    );
  }
}

export default ProfileEdit;
