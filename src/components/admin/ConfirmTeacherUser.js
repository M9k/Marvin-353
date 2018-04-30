import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../custom/Form';
import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import PageTableForm from '../template/PageTableForm';
import { creators } from '../../sagas/AdminSaga';

const ConfirmTeacher = props => (
  <div>
    <Form
      description="Confirm teacher account"
      fields={[{
        name: 'teacherAddress',
        label: 'Address:',
        help: 'insert the address of the teacher',
        placeholder: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
        type: FieldTypes.TEXT,
        validateFunction: Utils.validEthAddress,
      }]}
      submitFunction={props.confirmTeacher}
    />
    <PageTableForm
      getTableData={props.getPendingTeachers}
      tableData={props.teacherAccounts}
      deleteMultiColumnRow={props.denyTeacher}
      headerInfo={['name', 'surname', 'address', 'Deny']}
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
    confirmTeacher: objArr => (
      dispatch(creators.approveUserAction(objArr.teacherAddress.value))
    ),
    denyTeacher: address => dispatch(creators.removeUserAction(address)),
    getPendingTeachers: () => dispatch(creators.getPendingTEachersAction())
    ,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTeacher);

