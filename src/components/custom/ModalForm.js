import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';


class ModalForm extends React.Component {
  render() {
    return (
      <div>
        <Modal show={this.props.show}>
          <Modal.Header>
            <b>{this.props.title}</b>
          </Modal.Header>
          <Modal.Body>
            {this.props.children}
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

ModalForm.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

ModalForm.defaultProps = {
  children: null,
};

export default ModalForm;
