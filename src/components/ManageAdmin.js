import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
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
    const list = [];
    for (let i = 0; i < this.props.adminNumber; i += 1) {
      const nr = this.props.getAdmin(i);
      console.log(nr);
      //list.push(<ListGroupItem>{nr}</ListGroupItem>);
    }

    return (
      <div id="ManageAdmin">
        <Header />
        <h1 className="title">Manage admin</h1>
        <h2>Add new admin</h2>
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
        <h2>Admin list</h2>
        <Button onClick={this.props.getAdminNumber}>Admins number</Button>
        ={this.props.adminNumber}<br />
        <ListGroup>
        </ListGroup>
      </div>
    );
  }
}

ManageAdmin.propTypes = {
  adminNumber: PropTypes.number,
  getAdminNumber: PropTypes.func,
  addAdmin: PropTypes.func,
  getAdmin: PropTypes.func,
};

ManageAdmin.defaultProps = {
  adminNumber: 0,
  getAdminNumber: () => {},
  addAdmin: () => {},
  getAdmin: () => {},
};

const mapStateToProps = state => ({
  adminNumber: state.university.adminNumber,
});

function mapDispatchToProps(dispatch) {
  return {
    // return the number of admins
    getAdminNumber: () => dispatch({
      type: universityAction.GET_ADMIN_NUMBER,
    }),
    // add a new admin
    addAdmin: _address => dispatch({
      type: universityAction.ADD_NEW_ADMIN,
      address: _address,
    }),
    // return the address of a admin
    getAdmin: _number => dispatch({
      type: universityAction.GET_ADMIN,
      number: _number,
      account: null,
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);

