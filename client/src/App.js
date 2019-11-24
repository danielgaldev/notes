import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
//
import Login from './components/Login';
import { logout, getUser } from './utils/actions';
import { LoggedInRoute, AdminRoute } from './components/routing';
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';
import Admin from './pages/Admin';


export const history = createBrowserHistory();

function App({ user, logout, getUser }) {
  React.useEffect(() => {
    getUser();
  }, [getUser])
  return (
    <Router history={history}>
      <Switch>
        <LoggedInRoute exact path='/' user={user}>
          <div>
            <h1>Hello user</h1>
            <button onClick={logout}>Logout</button><br />
            <Link to='/admin'>Admin</Link>
          </div>
        </LoggedInRoute>
        <AdminRoute exact path='/admin' user={user}><Admin /></AdminRoute>
        <Route exact path='/login' component={Login} />
        <Route exact path='/forbidden' component={Forbidden} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default connect(state => ({ user: state.auth.user }), { logout, getUser })(App);
