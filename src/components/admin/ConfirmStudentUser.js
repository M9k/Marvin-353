import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../custom/Form';
import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import PageTableForm from '../template/PageTableForm';
import { creators } from '../../sagas/AdminSaga';


const ConfirmStudent = props => (
  <div>
    <Form
      description="Confirm student account"
      fields={[{
        name: 'studentAddress',
        label: 'Address:',
        help: 'insert the address of the student',
        placeholder: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
        type: FieldTypes.TEXT,
        validateFunction: Utils.validEthAddress,
      }]}
      submitFunction={props.confirmStudent}
    />
    <PageTableForm
      getTableData={props.getPendingStudents}
      tableData={props.studentAccounts}
      deleteMultiColumnRow={props.denyStudent}
      headerInfo={['name', 'surname', 'address', 'course', 'deny']}
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
    confirmStudent: objArr => (
      dispatch(creators.approveUserAction(objArr.addressStudent.value))
    ),
    denyStudent: address => dispatch(creators.removeUserAction(address)),
    getPendingStudents: () => dispatch(creators.getPendingStudentsAction())
    ,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmStudent);

