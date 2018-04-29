import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';


class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.handle = this.handle.bind(this);
    this.close = this.close.bind(this);
    this.state = { showing: this.props.show };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ showing: newProps.show });
  }

  handle() {
    this.props.yesFunction(this.props.keyForModal);
    this.setState({
      showing: false,
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
        <Modal show={this.state.showing}>
          <Modal.Header>
            <b>{this.props.title}</b>
          </Modal.Header>
          <Modal.Body>
            {this.props.children}
          </Modal.Body>
          <Modal.Footer>
            {this.props.yesFunction !== undefined && <Button bsStyle="primary" onClick={this.handle}>Yes</Button>}
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ModalForm.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
  yesFunction: PropTypes.func,
  keyForModal: PropTypes.string,

};

ModalForm.defaultProps = {
  show: false,
  children: null,
  yesFunction: undefined,
  keyForModal: '',
};

export default ModalForm;
