import React from 'react';
import { connect } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
//
import { login } from '../utils/actions';


function Login({ login, user }) {
  let location = useLocation();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // If user is already logged in, redirect back
  if (user && user.username) {
    let { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;

  } else {
    function handleSubmit(e) {
      e.preventDefault();
      setUsername('');
      setPassword('');
      login(username, password);
    }
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <input type='submit' value='Login' />
      </form>
    );
  }
}

export default connect(state => ({ user: state.auth.user }), { login })(Login);
