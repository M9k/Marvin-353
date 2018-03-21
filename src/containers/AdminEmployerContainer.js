import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { universityAction } from '../actions/actions';

import FormAddAdmin from '../components/form/FormAddAdmin';

const AdminEmployerContainer = ({ addAdmin }) => (
  <div id="admin-employer">
    <h2>Add a new admin</h2>
    <FormAddAdmin addAdmin={addAdmin} />
  </div>
);

AdminEmployerContainer.propTypes = {
  addAdmin: PropTypes.func,
};

AdminEmployerContainer.defaultProps = {
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

export default connect(() => ({}), mapDispatchToProps)(AdminEmployerContainer);
