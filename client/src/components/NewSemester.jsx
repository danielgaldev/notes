import React, { Component } from 'react';
import { Button, Icon, Modal, Form } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { semesters } from '../actions';


class NewSemester extends Component {

  constructor(props) {
    super(props);
    this.state = {
      number: '',
      open: false
    };
  }

  close = () => { this.setState({ open: false }) }
  open = () => { this.setState({ open: true }) }

  handleSave() {
    this.props.addSemester(this.state.number);
    this.close();
  }

  render() {
    return (
      <Modal size='mini'
        trigger={
          <Button primary onClick={this.open}>
            <Icon name='plus' />
            Add Semester
          </Button>
        }
        open={this.state.open}
        onClose={this.close}>
        <Modal.Header>Create a new Semester</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Number</label>
              <input
                placeholder='Semester number...'
                onChange={e => this.setState({ number: e.target.value })} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.close}>
            Cancel
          </Button>
          <Button
            primary
            onClick={this.handleSave.bind(this)}>
            <Icon name='save' />
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  return {
    semesters: state.semesters,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSemester: (number) => {
      return dispatch(semesters.addSemester(number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSemester);