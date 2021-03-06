import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {isAuthenticated} from '../services/auth';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Comic from 'pages/Comic';
import Character from 'pages/Character';
import Profile from 'pages/Profile';
import NotFound from 'pages/NotFound';
import RatedComic from 'pages/RatedComic';
import RatedCharacter from 'pages/RatedCharacter';
import Favorite from 'pages/Favorite';
import ForgotPassword from 'pages/ForgotPassword';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: '/', state: {from: props.location}}} />
      )
    }
  />
);

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path='/' render={(props) => <Home {...props} />} />
        <Route
          exact={true}
          path='/login'
          render={(props) => <Login {...props} />}
        />
        <Route
          exact={true}
          path='/register'
          render={(props) => <Register {...props} />}
        />
        <Route
          exact={true}
          path='/forgot-password'
          render={(props) => <ForgotPassword {...props} />}
        />
        <Route
          exact={true}
          path='/comics'
          render={(props) => <Comic {...props} />}
        />
        <Route
          exact={true}
          path='/characters'
          render={(props) => <Character {...props} />}
        />
        <PrivateRoute
          exact={true}
          path='/my-favorites'
          component={(props) => <Favorite {...props} />}
        />
        <PrivateRoute
          exact={true}
          path='/rated-characters'
          component={(props) => <RatedCharacter {...props} />}
        />
        <PrivateRoute
          exact={true}
          path='/rated-comics'
          component={(props) => <RatedComic {...props} />}
        />
        <PrivateRoute
          exact={true}
          path='/profile'
          component={(props) => <Profile {...props} />}
        />
        <Route path='*' render={(props) => <NotFound {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}
