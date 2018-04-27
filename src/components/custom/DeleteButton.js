import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';


class deleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handle = this.handle.bind(this);
    this.close = this.close.bind(this);
    this.state = { showing: false };
  }
  handle() {
    this.props.deleteFunction(this.props.objectToRemove.item);
    this.setState({
      showing: false,
    });
  }
  handleClick() {
    this.setState({
      showing: true,
    });
  }
  close() {
    this.setState({
      showing: false,
    });
  }
  render() {
    return (
      <div>
        <Button bsStyle="danger" onClick={this.handleClick}>Delete</Button>
        <Modal show={this.state.showing}>
          <Modal.Header>
            Delete confirmation
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {this.props.objectToRemove.item}?
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.handle}>Yes</Button>
            <Button bsStyle="info" onClick={this.close}>No</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

deleteButton.propTypes = {
  deleteFunction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  objectToRemove: PropTypes.object.isRequired,
};

export default deleteButton;
