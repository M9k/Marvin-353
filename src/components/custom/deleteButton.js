import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';


export default class deleteButton extends React.Component {
  handleClick(event) {
    // Todo
  }
  render() {
    return (
      <Button bsStyle="danger" onClick={this.handleClick()}>Delete</Button>
    );
  }
}

deleteButton.propType = {
  deleteTableData: PropTypes.func,
};

deleteButton.defaultProps = {
  deleteTableData: () => -1,
};
