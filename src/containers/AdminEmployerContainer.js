import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as universitySagaAction from '../sagas/adminEmployerSaga';
import FormAddAdmin from '../components/form/FormAddAdmin';

export const AdminEmployerComponent = ({ addAdmin }) => (
  <div id="admin-employer">
    <h2>Add a new admin</h2>
    <FormAddAdmin addAdmin={addAdmin} />
  </div>
);

AdminEmployerComponent.propTypes = {
  addAdmin: PropTypes.func,
};

AdminEmployerComponent.defaultProps = {
  addAdmin: () => {},
};
function mapDispatchToProps(dispatch) {
  return {
    addAdmin: address => dispatch(universitySagaAction.addNewAdminAction(address)),
  };
}

export default connect(() => ({}), mapDispatchToProps)(AdminEmployerComponent);
