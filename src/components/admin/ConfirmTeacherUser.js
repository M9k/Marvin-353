import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageTableForm from '../template/PageTableForm';
import { creators } from '../../sagas/AdminSaga';
import ROLES from '../../util/logic/AccountEnum';


const ConfirmTeacher = props => (
  <div>
    <PageTableForm
      getTableData={props.getPendingTeachers}
      tableData={props.teacherAccounts}
      deleteSingleColumnRow={props.denyTeacher}
      confirmationFunction={props.confirmTeacher}
      headerInfo={['Address', 'Confirm', 'Deny']}
    />
  </div>
);

ConfirmTeacher.propTypes = {
  confirmTeacher: PropTypes.func.isRequired,
  getPendingTeachers: PropTypes.func.isRequired,
  denyTeacher: PropTypes.func.isRequired,
  teacherAccounts: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = state => ({
  teacherAccounts: state.accounts.pendingTeachersList,
});

function mapDispatchToProps(dispatch) {
  return {
    confirmTeacher: a => dispatch(creators.approveUserAction(ROLES.UNCONFIRMED_TEACHER, a)),
    denyTeacher: address => dispatch(creators.removeUserAction(ROLES.UNCONFIRMED_TEACHER, address)),
    getPendingTeachers: () => dispatch(creators.getPendingTEachersAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTeacher);

