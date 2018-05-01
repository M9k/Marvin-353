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
      tableData={props.pendingTeachers}
      tableButtons={[
        {
          buttonFunction: props.confirmTeacher,
          buttonText: 'Confirm',
          buttonType: 'primary',
        },
        {
          buttonFunction: props.denyTeacher,
          buttonText: 'Deny',
          buttonType: 'danger',
        },
      ]}
      headerInfo={['Address', 'Name', 'Surname', 'Confirm', 'Unconfirm']}
      columFilter
    />
  </div>
);

ConfirmTeacher.propTypes = {
  confirmTeacher: PropTypes.func.isRequired,
  getPendingTeachers: PropTypes.func.isRequired,
  denyTeacher: PropTypes.func.isRequired,
  pendingTeachers: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = state => ({
  pendingTeachers: state.accounts.pendingTeachersList,
});

function mapDispatchToProps(dispatch) {
  return {
    confirmTeacher: teacher =>
      dispatch(creators.approveUserAction(ROLES.UNCONFIRMED_TEACHER, teacher.contract)),
    denyTeacher: teacher => dispatch(creators.removeUserAction(
      ROLES.UNCONFIRMED_TEACHER,
      teacher.contract,
    )),
    getPendingTeachers: () => dispatch(creators.getPendingTEachersAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTeacher);

