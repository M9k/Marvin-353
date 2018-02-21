import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

class AlertDismissable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleDismiss = this.handleDismiss.bind(this);

    this.children = props.children;
    this.type = props.type;
    // type = success (green) | warning (yellow) | danger (red) | info (blue)
    this.state = { show: true };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  render() {
    if (this.state.show) {
      return (
        <Alert bsStyle={this.type} onDismiss={this.handleDismiss}>
          <h4>Error</h4>
          <p>
            {this.children}
          </p>
        </Alert>
      );
    }
    return null;
  }
}

AlertDismissable.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default AlertDismissable;
