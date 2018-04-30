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
      tableData={
        props.pendingTeachers
        // TODO
        // nascondere il contratto
        // applicare le azioni sul campo corretto
        // controllare che il messaggio nel pop-up abbia senso
        // controllare non ci siano errori nella console web
      }
      deleteSingleColumnRow={props.denyTeacher}
      confirmationFunction={props.confirmTeacher}
      headerInfo={['CONTRATTO DA NON MOSTRARE', 'Address', 'Name', 'Surname', 'Confirm', 'Deny']}
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
    confirmTeacher: address =>
      dispatch(creators.approveUserAction(ROLES.UNCONFIRMED_TEACHER, address)),
    denyTeacher: address => dispatch(creators.removeUserAction(ROLES.UNCONFIRMED_TEACHER, address)),
    getPendingTeachers: () => dispatch(creators.getPendingTEachersAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTeacher);

