import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';

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
