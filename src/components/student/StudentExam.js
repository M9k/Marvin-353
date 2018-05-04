import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageTableForm from '../template/PageTableForm';
import { creators as studentExamSaga } from '../../sagas/StudentSaga';

class StudentExam extends React.Component {
  constructor(props) {
    super(props);
    this.getExams = this.getExams.bind(this);
  }
  getExams() {
    this.props.getEnrolledExams(this.props.myAddress);
  }
  render() {
    console.log('StudentExam is using address ', this.props.myAddress);

    return (
      <div>
        <PageTableForm
          getTableData={this.getExams}
          tableData={this.props.ExamsList}
          headerInfo={['Name', 'Credits', 'Mandatory', 'TeacherName', 'TeacherSurname', 'Vote']}
          columFilter
        />
      </div>
    );
  }
}

StudentExam.propTypes = {
  getEnrolledExams: PropTypes.func.isRequired,
  ExamsList: PropTypes.arrayOf(Object).isRequired,
  myAddress: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  ExamsList: state.student.examsList,
  myAddress: state.user.data.contract,
});

function mapDispatchToProps(dispatch) {
  return {
    getEnrolledExams: add =>
      dispatch(studentExamSaga.getExamsAction(add)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentExam);

