import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './global/Header';
import { universityAction } from '../reducers/university';

const ManageAdmin = ({ adminNumber, getAdminNumber }) => {
  document.title = 'Manage Admin - Marvin';
  return (
    <div id="ManageAdmin">
      <Header />
      <div className="page-content">
        <a className="btn btn-default" onClick={getAdminNumber}>Admins number:</a>
        ={adminNumber}<br />
      </div>
    </div>
  );
};


ManageAdmin.propTypes = {
  adminNumber: PropTypes.number,
  getAdminNumber: PropTypes.func,
};

ManageAdmin.defaultProps = {
  adminNumber: 0,
  getAdminNumber: () => {},
};

const mapStateToProps = state => ({
  adminNumber: state.university.adminNumber,
});

function mapDispatchToProps(dispatch) {
  return {
    getAdminNumber: () => dispatch({
      type: universityAction.GET_ADMIN_NUMBER,
    }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);

