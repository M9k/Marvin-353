import React from 'react';
import PropTypes from 'prop-types';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class RemoveList extends React.Component {
  constructor(props) {
    super(props);
    this.removeTrigger = this.removeTrigger.bind(this);
  }
  getElements() {
    return this.props.elements.map((element, index) => (
      <ListGroupItem>
        {element}
        <Button onClick={this.removeTrigger} id={index} bsClass="deleteBtn" bsSize="small">
            remove
        </Button>
      </ListGroupItem>
    ));
  }

  removeTrigger(e) {
    e.preventDefault();
    this.props.removeFnc(e.target.id);
  }

  render() {
    return (
      <ListGroup>
        {this.getElements()}
      </ListGroup>
    );
  }
}

RemoveList.propTypes = {
  elements: PropTypes.arrayOf(String),
  removeFnc: PropTypes.func,
};

RemoveList.defaultProps = {
  elements: [],
  removeFnc: () => {},
};

export default RemoveList;
