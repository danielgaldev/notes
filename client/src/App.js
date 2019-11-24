import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Login from './components/Login';
import ItemList from './components/ItemList';
import { logout, getUser } from './utils/actions';


export const history = createBrowserHistory();

function LoggedInRoute({ path, children, user, ...rest }) {
  if (user && user.username) {
    return <Route path={path} {...rest}>{children}</Route>;
  } else {
    return <Redirect to='/login' />;
  }
}

function LoggedOutRoute({ path, children, user, ...rest }) {
  if (user && user.username) {
    return <Redirect to='/' />;
  } else {
    return <Route path={path} {...rest}>{children}</Route>;
  }
}

function NotFound() {
  return (<h1>Not found</h1>);
}


function App({ user, logout, getUser }) {
  React.useEffect(() => {
    getUser();
  }, [getUser])
  return (
    <Router history={history}>
      <Switch>
        <LoggedInRoute exact path='/' user={user}><div><h1>Hello user</h1><button onClick={logout}>Logout</button></div></LoggedInRoute>
        <LoggedOutRoute exact path='/login' user={user}><Login /></LoggedOutRoute>
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
    // <div>
    //   {user && (
    //     <div>
    //       <div>Logged in as {user.username}</div>
    //       <button onClick={logout}>Logout</button>
    //       <ItemList />
    //     </div>
    //   )}
    //   {!user && <Login />}
    //   {user && user.is_staff && <div>Only admins can see this</div>}
    // </div>
  );
}

export default connect(state => ({ user: state.auth.user }), { logout, getUser })(App);
