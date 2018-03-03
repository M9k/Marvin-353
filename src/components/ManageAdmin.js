import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import Header from './global/Header';
import { universityAction } from '../actions/actions';
import FormAddAdmin from './form/FormAddAdmin';

class ManageAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    document.title = 'Manage Admin - Marvin';
  }
  componentWillMount() {
    this.refreshData();
  }

  refreshData() {
    this.props.getAdminNumber();
    this.props.getAllAdmin();
  }

  render() {
    const list = [];
    const admin = this.props.adminAccount;
    for (let i = 0; admin !== null && i < admin.length; i += 1) {
      list.push(<ListGroupItem>{admin[i]}</ListGroupItem>);
    }

    return (
      <div id="ManageAdmin">
        <Header />
        <h1 className="title">Manage admins</h1>
        <h2>Add a new admin</h2>
        <FormAddAdmin addAdmin={this.props.addAdmin} />
        <h2>Admin list</h2>
        <Button onClick={this.refreshData}>Refresh</Button><br />
        Number of admins: {this.props.adminNumber}<br />
        <ListGroup>
          {list}
        </ListGroup>
      </div>
    );
  }
}

ManageAdmin.propTypes = {
  adminNumber: PropTypes.number,
  adminAccount: PropTypes.arrayOf(String),
  getAdminNumber: PropTypes.func,
  addAdmin: PropTypes.func,
  getAllAdmin: PropTypes.func,
};

ManageAdmin.defaultProps = {
  adminNumber: 0,
  adminAccount: [],
  getAdminNumber: () => {},
  addAdmin: () => {},
  getAllAdmin: () => {},
};

const mapStateToProps = state => ({
  adminNumber: state.university.adminNumber,
  adminAccount: state.university.adminAccount,
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
    getAllAdmin: _number => dispatch({
      type: universityAction.GET_ALL_ADMINS,
      number: _number,
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);

