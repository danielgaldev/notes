import React from 'react';
import {Route, Redirect} from 'react-router-dom';


export function LoggedInRoute({ path, children, user, ...rest }) {
  if (user && user.username) {
    return <Route path={path} {...rest}>{children}</Route>;
  } else {
    return <Redirect to='/login' />;
  }
}


export function LoggedOutRoute({ path, children, user, ...rest }) {
  if (user && user.username) {
    return <Redirect to='/' />;
  } else {
    return <Route path={path} {...rest}>{children}</Route>;
  }
}
