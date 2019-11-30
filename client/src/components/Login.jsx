import React from 'react';
import { connect } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
//
import { login } from '../utils/actions';
import s from './Login.module.css';


function Login({ login, user }) {
  let location = useLocation();

  // If user is already logged in, redirect back
  if (user && user.username) {
    let { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;

  } else {
    function handleSubmit(e) {
      e.preventDefault();
      const form = e.currentTarget;
      login(form.username.value, form.password.value);
    }
    return (
      <main className={s['container']}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit" className={s['login-button']}>
            Login
          </Button>
        </Form>
      </main>
    );
  }
}

export default connect(state => ({ user: state.auth.user }), { login })(Login);
