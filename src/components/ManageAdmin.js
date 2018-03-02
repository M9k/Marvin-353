import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Header from './global/Header';
import { universityAction } from '../reducers/university';
import FormAddAdmin from './form/FormAddAdmin';

class ManageAdmin extends React.Component {
  constructor(props) {
    super(props);
    document.title = 'Manage Admin - Marvin';
  }
  componentWillMount() {
    this.props.getAdminNumber();
  }

  render() {
    return (
      <div id="ManageAdmin">
        <Header />
        <div className="page-content">
          <Button onClick={this.props.getAdminNumber}>Admins number:</Button>
         ={this.props.adminNumber}<br />
        </div>
        <FormAddAdmin addAdmin={this.props.addAdmin} />
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

