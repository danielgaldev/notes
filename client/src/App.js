import React from 'react';
import { connect } from 'react-redux';

import Login from './components/Login';
import ItemList from './components/ItemList';
import { logout, getUser } from './utils/actions';


function App({ user, logout, getUser }) {
  React.useEffect(() => {
    getUser();
  }, [getUser])
  return (
    <div>
      {user && (
        <div>
          <div>Logged in as {user.username}</div>
          <button onClick={logout}>Logout</button>
          <ItemList />
        </div>
      )}
      {!user && <Login />}
      {user && user.is_staff && <div>Only admins can see this</div>}
    </div>
  );
}

export default connect(state => ({ user: state.auth.user }), { logout, getUser })(App);
