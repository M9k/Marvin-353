import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageTableForm from '../template/PageTableForm';
import { creators as teacherExamSaga } from '../../sagas/TeacherExamSaga';


class TeacherExams extends React.Component {
  /**
   * Redirect user to the selected exam
   * @param item the row/exam object with all the info about
   * the exam but just need the code or primary key of it
   */
  static seeExam(item) {
    document.location.href = `/exams/${item.code}/`;
  }

  constructor(props) {
    super(props);
    this.getMyAssignedExamsAddr = this.getMyAssignedExamsAddr.bind(this);
  }

  /**
   * load the exams of the currently loggedin teacher looking
   * at this address in the props
   */
  getMyAssignedExamsAddr() {
    this.props.getMyAssignedExams(this.props.myWeb3Address);
  }

  render() {
    return (
      <div>
        <PageTableForm
          getTableData={this.getMyAssignedExamsAddr}
          tableData={this.props.assignedExams}
          headerInfo={['Name', 'credits', 'Name of the associated  course', 'year', 'details']}
          tableButtons={[
            {
              buttonFunction: TeacherExams.seeExam,
              buttonText: 'View students',
              buttonType: 'primary',
            },
          ]}
        />
      </div>
    );
  }
}

TeacherExams.propTypes = {
  getMyAssignedExams: PropTypes.func.isRequired,
  assignedExams: PropTypes.arrayOf(String).isRequired,
  myWeb3Address: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  assignedExams: state.teacherData.list,
  myWeb3Address: state.metamask.account,
});

function mapDispatchToProps(dispatch) {
  return {
    getMyAssignedExams: addr => (
      dispatch(teacherExamSaga.getList(addr))
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherExams);
