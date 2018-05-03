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
    console.log('Il valore del address', this.props.myAddress);

    return (
      <div>
        <PageTableForm
          getTableData={this.getExams}
          tableData={this.props.ExamsList}
          headerInfo={['Name', 'Credits', 'Mandatory', 'Valutation']}
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
  ExamsList: state.student.enrolledExamsList,
  myAddress: state.user.contract,
});

function mapDispatchToProps(dispatch) {
  return {
    getEnrolledExams: add =>
      dispatch(studentExamSaga.getEnrolledExamsAction(add)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentExam);

