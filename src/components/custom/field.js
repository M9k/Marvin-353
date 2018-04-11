import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/es/FormGroup';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormControl from 'react-bootstrap/es/FormControl';
import Checkbox from 'react-bootstrap/es/Checkbox';
import HelpBlock from 'react-bootstrap/es/HelpBlock';
import FieldTypes from './fieldtypes';


class Field extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  getValidationState() {
    return this.props.validateFunction(this.state.value);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  componentDidCatch(error, info) {
    console.log('LABEL:', error, info, JSON.stringify(this.state));
  }

  render() {
    const field = [];
    switch (this.props.type) {
      case FieldTypes.CHECKBOX:
        field.push(<Checkbox inline onClick={this.handleChange}>{this.props.name}</Checkbox>);
        break;
      case FieldTypes.TEXT:
      default:
        field.push(<FormControl
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
        />);
        break;
    }// switch FieldTypes

    return (
      <FormGroup validationState={this.getValidationState}>
        <ControlLabel>{this.props.label}</ControlLabel>
        {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
        {field}
      </FormGroup>
    );
  }
}

Field.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  help: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(FieldTypes)),
  validateFunction: PropTypes.func,
};

Field.defaultProps = {
  name: '',
  label: 'Field',
  placeholder: '',
  help: 'Insert value',
  type: FieldTypes.TEXT,
  validateFunction: null,
};

export default (Field);
