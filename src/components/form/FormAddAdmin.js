import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

class FormAddAdmin extends React.Component {
  constructor(props) {
    super(props);
    document.title = 'Manage Admin - Marvin';

    this.state = {
      newAddress: '',
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  getValidationState() {
    if (this.state.newAddress.length === 0) {
      return 'warning';
    }
    if (!/^(0x)[0-9a-f]{40}$/i.test(this.state.newAddress) || !web3.isAddress(this.state.newAddress)) {
      return 'error';
    }
    return 'success';
  }

  handleAddressChange(e) {
    this.setState({ newAddress: e.target.value });
  }
  render() {
    return (
      <FormGroup validationState={this.getValidationState()}>
        <ControlLabel>New admin address:</ControlLabel>
        <FormControl
          id="formControlsText"
          type="text"
          placeholder="0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf"
          onChange={this.handleAddressChange}
        />
        {this.getValidationState() === 'success' ? <Button onClick={() => this.props.addAdmin(this.state.newAddress)}>Add</Button> : <Button disabled>Add</Button>}
      </FormGroup>
    );
  }
}

FormAddAdmin.propTypes = {
  addAdmin: PropTypes.func.isRequired,
};

export default FormAddAdmin;
