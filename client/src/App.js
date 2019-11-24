import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
//
import Login from './components/Login';
import { logout, getUser } from './utils/actions';
import { LoggedInRoute, LoggedOutRoute } from './components/routing';
import NotFound from './pages/NotFound';


export const history = createBrowserHistory();

function App({ user, logout, getUser }) {
  React.useEffect(() => {
    getUser();
  }, [getUser])
  return (
    <Router history={history}>
      <Switch>
        <LoggedOutRoute exact path='/login' user={user}><Login /></LoggedOutRoute>
        <LoggedInRoute exact path='/' user={user}><div><h1>Hello user</h1><button onClick={logout}>Logout</button></div></LoggedInRoute>
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default connect(state => ({ user: state.auth.user }), { logout, getUser })(App);
