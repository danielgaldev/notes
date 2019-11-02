import React, { Component } from 'react';
import { Container, Header, Table, Button } from 'semantic-ui-react'
import { Menu, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { semesters, auth } from '../actions';
import NewSemester from './NewSemester';


class SemestR extends Component {
  componentDidMount() {
    this.props.fetchSemesters();
  }

  handleLogout() {
    this.props.logout();
    this.props.removeAll();
  }

  render() {
    return (
      <div style={{ padding: '2em', paddingTop: '5em' }}>
        <Menu borderless fixed='top'>
          <Menu.Item>
            <Header>
              <Icon name='sticky note' size='large' />
              SemestR
          </Header>
          </Menu.Item>
          <Menu.Item position='right'>
            {this.props.user.username}
          </Menu.Item>
          <Menu.Item
            position='right'
            name='logout'
            onClick={this.handleLogout.bind(this)}
          />
        </Menu>
        <Container text>
          <NewSemester />
          <Header>
            Semesters
          </Header>
          <Table selectable unstackable color='blue'>
            <Table.Body>
              {this.props.semesters.map((semester, index) => (
                <Table.Row
                  key={`semester_${index}`}>
                  <Table.Cell>
                    {semester.number.toString().concat('. semester')}
                  </Table.Cell>
                  <Table.Cell collapsing>
                    <Button
                      onClick={() => this.props.deleteSemester(index)}
                      icon='trash alternate' />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    semesters: state.semesters,
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSemesters: () => {
      return dispatch(semesters.fetchSemesters());
    },
    deleteSemester: (index) => {
      return dispatch(semesters.deleteSemester(index));
    },
    logout: () => {
      return dispatch(auth.logout());
    },
    removeAll: () => {
      return dispatch(semesters.removeAllSemesters());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SemestR);