import React from 'react';
import { connect } from 'react-redux';
import { creators as AdminEmployerAction } from '../sagas/AdminEmployerSaga';

export const AdminEmployerComponent = () => (
  <div id="admin-employer">
    <h2>Add a new admin</h2>
  </div>
);


function mapDispatchToProps(dispatch) {
  return {
    addAdmin: address => dispatch(AdminEmployerAction.addNewAdminAction(address)),
  };
}

export default connect(() => ({}), mapDispatchToProps)(AdminEmployerComponent);
