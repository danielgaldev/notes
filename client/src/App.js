import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
//
import Login from './components/Login';
import { getUser } from './utils/actions';
import { LoggedInRoute, AdminRoute } from './components/routing';
import NotFound from './pages/NotFound';
import Forbidden from './pages/Forbidden';
import Admin from './pages/Admin';
import Home from './pages/Home';
import SemesterDetailPage from './pages/SemesterDetailPage';


export const history = createBrowserHistory();

// Icons
library.add(faEllipsisV);

function App({ user, getUser }) {
  React.useEffect(() => {
    getUser();
  }, [getUser])
  return (
    <Router history={history}>
      <Switch>
        <LoggedInRoute exact path='/' user={user}><Home /></LoggedInRoute>
        <LoggedInRoute exact path='/semesters/:id' user={user}><SemesterDetailPage /></LoggedInRoute>
        <AdminRoute exact path='/admin' user={user}><Admin /></AdminRoute>
        <Route exact path='/login' component={Login} />
        <Route exact path='/forbidden' component={Forbidden} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default connect(state => ({ user: state.auth.user }), { getUser })(App);
