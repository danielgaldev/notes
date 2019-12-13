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
      <div className='h-full flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-semibold'>Login</h1>
        <form
          className='p-4'
          onSubmit={handleSubmit}>
          <label className='flex flex-col w-full sm:w-64'>
            <span className='my-1'>Username</span>
            <input
              className='p-1 border border-solid border-gray-500 focus:border-purple-800'
              placeholder='Enter your username'
              type='text'
              value={username}
              onChange={e => setUsername(e.target.value)} />
          </label>
          <label className='flex flex-col w-full sm:w-64'>
            <span className='my-1'>Password</span>
            <input
              className='p-1 border border-solid border-gray-500 focus:border-purple-800'
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={e => setPassword(e.target.value)} />
          </label>
          <input
            className='my-4 p-1 bg-purple-600 hover:bg-purple-800 focus:bg-purple-800 w-full sm:w-64 cursor-pointer text-gray-100'
            type='submit'
            value='Login' />
        </form>
      </div>
    );
  }
}

export default connect(state => ({ user: state.auth.user }), { login })(Login);
