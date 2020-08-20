import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {isAuthenticated} from '../services/auth';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Comic from 'pages/Comic';
import Character from 'pages/Character';
import Profile from 'pages/Profile';

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
          path='/profile'
          component={(props) => <Profile {...props} />}
        />
        <Route path='*' component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
