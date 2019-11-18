import React from 'react';
import { connect } from 'react-redux';

import { login } from '../utils/actions';

function Login({ login }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
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
        <input type='text' value={username} onChange={e => { setUsername(e.target.value) }} />
      </label>
      <br />
      <label>
        Password:
        <input type='password' value={password} onChange={e => { setPassword(e.target.value) }} />
      </label>
      <br />
      <input type='submit' value='Login' />
    </form>
  );
}

export default connect(null, { login })(Login);
