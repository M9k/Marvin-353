import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';


class deleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { showing: false };
  }

  handleClick() {
    this.setState({
      showing: true,
    });
  }

  render() {
    return (
      <div>
        <Button bsStyle="danger" onClick={this.handleClick}>{this.props.text}</Button>
        <ModalForm title="Delete confirmation" yesFunction={this.props.deleteFunction} keyForModal={this.props.objectToRemove.item} show={this.state.showing}>
          Are you sure you want to delete {this.props.objectToRemove.item}?
        </ModalForm>
      </div>
    );
  }
}

deleteButton.propTypes = {
  deleteFunction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  objectToRemove: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default deleteButton;
