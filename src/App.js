import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* <Header /> */}
        <main>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route path="/search" component={ Search } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/profile" component={ Profile } />
            <Route path="" component={ NotFound } />
          </Switch>
          {/* <Footer /> */}
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
