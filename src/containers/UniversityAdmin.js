import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { creators as AdminEmployerAction } from '../sagas/AdminEmployerSaga';
import FieldTypes from '../components/custom/fieldtypes';
import Utils from '../components/custom/utils';
import Form from '../components/custom/Form';

const UniversityAdmin = props => (
  <div>
    <Form
      description="Add new admin"
      fields={[{
        name: 'addressAdmin',
        label: 'Address:',
        help: 'insert the address of the admin',
        placeholder: '0xwxwxw0w40443xwxxwff',
        type: FieldTypes.TEXT,
        validateFunction: Utils.validEthAddress,
      }]}
      submitFunction={props.addAdmin}
    />
  </div>
);

UniversityAdmin.propTypes = {
  addAdmin: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    addAdmin: objArr => (
      dispatch(AdminEmployerAction.addNewAdminAction(objArr.addressAdmin.value))),
  };
}

export default connect(() => ({}), mapDispatchToProps)(UniversityAdmin);

