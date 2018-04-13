import React from 'react';
import PropType from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

class MessageBox extends React.Component {
  render() {
    let title = null;
    switch (this.props.type) {
      case 'success':
        title = 'Success';
        break;
      case 'error':
        title = 'Error';
        break;
      default:
        title = 'Message';
    }
    return (
      <div className="modal-container" style={{ height: 200 }}>
        <Modal
          {...this.props}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.message}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

MessageBox.propTypes = {
  message: PropType.string.isRequired,
  type: PropType.string.isRequired,
  onHide: PropType.func.isRequired,
};

export default (MessageBox);

