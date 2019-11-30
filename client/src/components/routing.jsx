import React from 'react';
import { Route, Redirect } from 'react-router-dom';


export function LoggedInRoute({ path, children, user, ...rest }) {
  const render = ({ location }) => {
    if (user && user.username) {
      return children;
    } else {
      return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
    }
  }
  return <Route {...rest} render={render} />;
}


export function AdminRoute({ path, children, user, ...rest }) {
  const render = ({location}) => {
    if (user && user.is_staff) {
      return children;
    } else if (user && user.username) {
      return <Redirect to={{ pathname: '/forbidden', state: { from: location } }} />;
    } else {
      return <Redirect to={{ pathname: '/login', state: { from: location } }} />;
    }
  }
  return <Route {...rest} render={render} />;
}
