import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageTableForm from '../template/PageTableForm';
import { creators } from '../../sagas/AdminSaga';
import ROLES from '../../util/logic/AccountEnum';


const ConfirmStudent = props => (
  <div>
    <PageTableForm
      getTableData={props.getPendingStudents}
      tableData={props.studentAccounts}
      tableButtons={[
        {
          buttonFunction: props.confirmStudent,
          buttonText: 'Confirm',
          buttonType: 'primary',
        },
        {
          buttonFunction: props.denyStudent,
          buttonText: 'Deny',
          buttonType: 'danger',
        },
      ]}
      headerInfo={['Address', 'Confirm', 'Deny']}
    />
  </div>
);


ConfirmStudent.propTypes = {
  confirmStudent: PropTypes.func.isRequired,
  getPendingStudents: PropTypes.func.isRequired,
  denyStudent: PropTypes.func.isRequired,
  studentAccounts: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = state => ({
  studentAccounts: state.accounts.pendingStudentsList,
});

function mapDispatchToProps(dispatch) {
  return {
    // eslint-disable-next-line
    confirmStudent: add => dispatch(creators.approveUserAction(ROLES.UNCONFIRMED_STUDENT, add.contract)),
    // eslint-disable-next-line
    denyStudent: add => dispatch(creators.removeUserAction(ROLES.UNCONFIRMED_STUDENT, add.contract)),
    getPendingStudents: () => dispatch(creators.getPendingStudentsAction())
    ,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmStudent);

