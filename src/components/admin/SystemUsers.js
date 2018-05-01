import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageTableForm from '../template/PageTableForm';
import { creators } from '../../sagas/AdminSaga';

const SystemUsers = props => (
  <div>
    <h4>List of all students:</h4>
    <PageTableForm
      getTableData={props.getStudents}
      tableData={props.studentAccounts}
      tableButtons={[
        {
          buttonFunction: props.deleteTeacher,
          buttonText: 'Delete',
          buttonType: 'danger',
        },
      ]}
      headerInfo={['Address', 'Remove']}
    />
    <h4>List of all teachers:</h4>
    <PageTableForm
      getTableData={props.getTeachers}
      tableData={props.teacherAccounts}
      tableButtons={[
        {
          buttonFunction: props.deleteStudent,
          buttonText: 'Delete',
          buttonType: 'danger',
        },
      ]}
      headerInfo={['Address', 'Remove']}
    />
  </div>
);


SystemUsers.propTypes = {
  getTeachers: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  deleteTeacher: PropTypes.func.isRequired,
  deleteStudent: PropTypes.func.isRequired,
  teacherAccounts: PropTypes.arrayOf(Object).isRequired,
  studentAccounts: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = state => ({
  teacherAccounts: state.accounts.teachersList,
  studentAccounts: state.accounts.studentsList,
});

function mapDispatchToProps(dispatch) {
  return {
    getTeachers: () => dispatch(creators.getAllStudentsAction()),
    getStudents: () => dispatch(creators.getAllTEachersAction()),
    // Metodi sotto sono da sistemare nella parte di Redux
    deleteTeacher: add => dispatch(creators.removeUserAction(add)),
    deleteStudent: add => dispatch(creators.removeUserAction(add)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemUsers);

