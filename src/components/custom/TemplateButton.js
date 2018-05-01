import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ModalForm from './ModalForm';


class TemplateButton extends React.Component {
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
        <Button bsStyle={this.props.type} onClick={this.handleClick}>{this.props.text}</Button>
        <ModalForm title="Confirmation" yesFunction={this.props.clickFunction} keyForModal={this.props.objectToWorkOn} show={this.state.showing}>
          <p>
            Are you sure you want to {this.props.text.toLowerCase() } this?
          </p>
        </ModalForm>
      </div>
    );
  }
}

TemplateButton.propTypes = {
  clickFunction: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  objectToWorkOn: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default TemplateButton;
