import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

import Field from './field';

class Form extends React.Component {
  static getKey(name, index) {
    return index.toString();
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { reset: false };
  }

  handleSubmit(event) {
    console.dir(this.state);
    // TODO function that check that each key valid is equals to 1 == Success before submit

    // if submit == TRUE == Success reset the form
    if (this.props.submitFunction() === 1) { this.setState({ reset: !this.state.reset }); }
    event.preventDefault();
  }

  render() {
    const fields = [];
    this.props.fields.map((value, i) => (
      fields.push(<Field
        {...value}
        onChangeValue={(e) => {
        this.setState({ [value.name]: { value: e, valid: value.validateFunction(e) } });
        // valid: value.validateFunction(e)
      }}
        reset={this.state.reset}
        key={Form.getKey('', i)}
      />)
    ));

    return (
      <Panel style={{ padding: '2%' }} >
        <form onSubmit={this.handleSubmit}>
          <legend>{this.props.description}</legend>
          {fields}
          <Button bsStyle="primary" type="submit">Submit</Button>
        </form>
      </Panel>
    );
  }
}

Form.propTypes = {
  submitFunction: PropTypes.func,
  fields: PropTypes.arrayOf(Object),
  description: PropTypes.string,
};

Form.defaultProps = {
  submitFunction: () => -1,
  fields: [],
  description: '',
};

export default (Form);
