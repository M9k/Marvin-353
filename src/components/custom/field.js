/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Radio from 'react-bootstrap/lib/Radio';
import FieldTypes from './fieldtypes';


class Field extends React.Component {
  static getKey(name, index) {
    return index.toString();
  }

  static getValidationStateString(value) {
    let stringValidState;
    switch (value) {
      case 2:
        stringValidState = 'warning';
        break;
      case 1:
      case true:
        stringValidState = 'success';
        break;
      case 0:
      case false:
        stringValidState = 'error';
        break;
      default:
        stringValidState = null;
        break;
    }
    return stringValidState;
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: '' };
  }

  getValidationState() {
    return Field.getValidationStateString(this.props.validateFunction(this.state.value));
  }

  handleChange(e) {
    const setTo = e.target.value;
    this.setState({ value: setTo });
    this.props.onChangeValue(setTo);
  }

  render() {
    const field = [];
    const options = [];
    const { name } = this.props;
    switch (this.props.type) {
      case FieldTypes.RADIO:
        this.props.values.map((value, i) => (
          field.push(<Radio key={Field.getKey(name, i)} onClick={this.handleChange} name={name}>{value}</Radio>)
        ));
        break;
      case FieldTypes.CHECKBOX:
        this.props.values.map((value, i) => (
          field.push(<Checkbox key={Field.getKey(name, i)} onClick={this.handleChange} name={name}>{value}</Checkbox>)
        ));
        break;
      case FieldTypes.SELECT:
        this.props.values.map((value, i) => (
          options.push(<option key={Field.getKey(name, i)} value={value}>{value}</option>)
        ));
        field.push(<FormControl componentClass="select" onClick={this.handleChange}>{options}</FormControl>);
        break;
      case FieldTypes.TEXT:
      default:
        field.push(<FormControl
          name={name}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
        />);
        break;
    }// switch FieldTypes

    return (
      <FormGroup validationState={this.getValidationState()}>
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
  type: PropTypes.oneOf(Object.values(FieldTypes)),
  validateFunction: PropTypes.func,
  values: PropTypes.arrayOf(String),
  onChangeValue: PropTypes.func.isRequired,
};

Field.defaultProps = {
  name: '',
  label: 'Field',
  placeholder: '',
  help: '',
  type: FieldTypes.TEXT,
  validateFunction: () => -1,
  values: [],
};

export default (Field);
