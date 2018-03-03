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
    document.title = 'Manage Admin - Marvin';
  }
  componentWillMount() {
    this.props.getAdminNumber();
    this.props.getAdmin(this.props.adminNumber);
  }

  render() {
    const list = [];
    const admin = this.props.adminAccount[0];
    for (let i = 0; i < admin.length; i += 1) {
      list.push(<ListGroupItem>{admin[i]}</ListGroupItem>);
    }

    return (
      <div id="ManageAdmin">
        <Header />
        <div className="page-content">
          <Button onClick={this.props.getAdminNumber}>Admins number:</Button>
         ={this.props.adminNumber}<br />
        </div>
        <FormAddAdmin addAdmin={this.props.addAdmin} />
        <h2>Admin list</h2>
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
  getAdmin: PropTypes.func,
};

ManageAdmin.defaultProps = {
  adminNumber: 0,
  adminAccount: [],
  getAdminNumber: () => {},
  addAdmin: () => {},
  getAdmin: () => {},
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
    getAdmin: _number => dispatch({
      type: universityAction.GET_ADMIN,
      number: _number,
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);

