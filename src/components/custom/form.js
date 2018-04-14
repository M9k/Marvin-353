import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';

import Field from './field';
import Utils from './utils';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.allValidFields = this.allValidFields.bind(this);
    this.state = { reset: false, fields: {} };

    // eslint-disable-next-line no-return-assign
    this.props.fields.map(field => (
      this.state = {
        fields: { ...this.state.fields, [field.name]: { value: '', valid: -1 } },
        reset: false,
      }));

    console.dir(this.state);
  }

  // function that check that each key valid is equals to 1 == Success before submit
  allValidFields() {
    return Object.keys(this.state.fields).every(field => this.state.fields[field].valid === 1);
  }

  handleSubmit(event) {
    console.log('SUBMIT');
    console.dir(this.state);
    event.preventDefault();
    if (this.allValidFields()) {
    // if submit == TRUE == Success reset the form
      if (this.props.submitFunction() === 1) { this.setState({ reset: !this.state.reset }); }
    }
  }

  render() {
    const fields = [];
    this.props.fields.map(field => (
      fields.push(<Field
        {...field}
        onChangeValue={(e) => {
        this.setState({
 fields: { ...this.state.fields, [field.name]: { value: e, valid: field.validateFunction(e) } },
        });
      }}
        reset={this.state.reset}
        key={Utils.generateKey(field.name)}
      />)
    ));

    return (
      <Panel style={{ padding: '2%' }} >
        <form onSubmit={this.handleSubmit}>
          <legend>{this.props.description}</legend>
          {fields}
          <Button bsStyle="primary" type="submit" disabled={!this.allValidFields()}>Submit</Button>
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