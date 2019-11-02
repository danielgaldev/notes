import React, { Component } from "react";
import { connect } from "react-redux";

import { Link, Redirect } from "react-router-dom";
import { Header, Button, Form, Icon, Segment, Divider, Grid } from 'semantic-ui-react'

import { auth } from "../actions";

class Login extends Component {

  state = {
    username: "",
    password: "",
    isRegistered: false
  }

  onSubmit = () => {
    this.props.register(this.state.username, this.state.password);
    this.setState({isRegistered: true});
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    if (this.state.isRegistered) {
      return <Redirect to="/login" />
    }
    return (
      <Grid style={{ padding: '4em' }} centered verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment color='blue' >
            <Header as='h1' icon textAlign='center'>
              <Icon name='student' circular />
              <Header.Content>SemestR</Header.Content>
            </Header>
            <Header as='h3' textAlign='center'>
              <Header.Content>Register</Header.Content>
            </Header>
            <Form>
              <Form.Field>
                <label>Username</label>
                <input placeholder='username'
                  onChange={e => this.setState({ username: e.target.value })} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type='password' placeholder='password'
                  onChange={e => this.setState({ password: e.target.value })} />
              </Form.Field>
              <div style={{ textAlign: 'center' }}>
                <Button primary fluid onClick={this.onSubmit.bind(this)}>
                  Register
                </Button>
              </div>
              <Divider />
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    register: (username, password) => dispatch(auth.register(username, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
