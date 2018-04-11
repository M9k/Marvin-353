import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Field from './field';


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.dir(this.state);
    this.props.submitFunction();
    event.preventDefault();
  }

  render() {
    const fields = [];
    this.props.fields.map(value => (
      fields.push(<Field
        {...value}
        onChangeValue={(e) => {
        this.setState({ [value.name]: { value: e } });
        // valid: value.validateFunction(e)
      }}
      />)
    ));

    return (
      <form onSubmit={this.handleSubmit}>THIS IS A DOPE form!!!
        <legend>{this.props.description}</legend>
        {fields}
        <Button type="submit">Submit</Button>
      </form>
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
  description: PropTypes.string,
};

export default (Form);
