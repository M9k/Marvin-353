import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageTableForm from '../template/PageTableForm';
import { creators } from '../../sagas/AdminSaga';
import ROLES from '../../util/logic/AccountEnum';
import ModalForm from '../custom/ModalForm';


class ConfirmStudent extends React.Component {
  constructor(props) {
    super(props);
    this.viewConfirm = this.viewConfirm.bind(this);
    this.viewDeny = this.viewDeny.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
    this.closeDeny = this.closeDeny.bind(this);
    this.state = { deny: false, confirm: false };
  }

  viewConfirm(item) {
    this.setState({ confirm: true, deny: false, item });
  }

  viewDeny(item) {
    this.setState({ deny: true, confirm: false, item });
  }

  closeConfirm(item) {
    this.setState({ confirm: false, deny: false });
    this.props.confirmStudent(item);
  }
  closeDeny(item) {
    this.setState({ confirm: false, deny: false });
    this.props.denyStudent(item);
  }
  render() {
    return (
      <div>
        <PageTableForm
          getTableData={this.props.getPendingStudents}
          tableData={this.props.pendingStudents}
          tableButtons={[
            {
              buttonFunction: this.viewConfirm,
              buttonText: 'Confirm',
              buttonType: 'primary',
            },
            {
              buttonFunction: this.viewDeny,
              buttonText: 'Deny',
              buttonType: 'danger',
            },
          ]}
          headerInfo={['Address', 'Name', 'Surname', 'Course', 'Confirm', 'Unconfirm']}
          columFilter
        />

        <ModalForm
          title="STUDENT CONFIRMATION"
          yesFunction={this.closeConfirm}
          keyForModal={{ item: this.state.item }}
          show={this.state.confirm}
        >
          <p>
            Are you sure you want to confirm this student?
          </p>
        </ModalForm>

        <ModalForm
          title="DENY A STUDENT"
          yesFunction={this.closeDeny}
          keyForModal={{ item: this.state.item }}
          show={this.state.deny}
        >
          <p>
            Are you sure you want to deny this student?
          </p>
        </ModalForm>

      </div>);
  }
}

ConfirmStudent.propTypes = {
  confirmStudent: PropTypes.func.isRequired,
  getPendingStudents: PropTypes.func.isRequired,
  denyStudent: PropTypes.func.isRequired,
  pendingStudents: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = state => ({
  pendingStudents: state.accounts.pendingStudentsList,
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

