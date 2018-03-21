import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { universityAction } from '../actions/actions';

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
    addAdmin: _address => dispatch({
      type: universityAction.ADD_NEW_ADMIN,
      address: _address,
    }),
  };
}

export default connect(() => ({}), mapDispatchToProps)(AdminEmployerComponent);
