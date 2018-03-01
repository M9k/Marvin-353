import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import Header from './global/Header';
import { universityAction } from '../reducers/university';

class ManageAdmin extends React.Component {
  constructor(props) {
    super(props);
    document.title = 'Manage Admin - Marvin';

    this.state = {
      newAddress: '',
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }
  componentWillMount() {
    this.props.getAdminNumber();
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
      <div id="ManageAdmin">
        <Header />
        <div className="page-content">
          <a className="btn btn-default" onClick={this.props.getAdminNumber}>Admins number:</a>
         ={this.props.adminNumber}<br />
        </div>
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
      </div>
    );
  }
}


ManageAdmin.propTypes = {
  adminNumber: PropTypes.number,
  getAdminNumber: PropTypes.func,
  addAdmin: PropTypes.func,
};

ManageAdmin.defaultProps = {
  adminNumber: 0,
  getAdminNumber: () => {},
  addAdmin: () => {},
};

const mapStateToProps = state => ({
  adminNumber: state.university.adminNumber,
});

function mapDispatchToProps(dispatch) {
  return {
    getAdminNumber: () => dispatch({
      type: universityAction.GET_ADMIN_NUMBER,
    }),
    addAdmin: _address => dispatch({
      type: universityAction.ADD_NEW_ADMIN,
      address: _address,
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);

