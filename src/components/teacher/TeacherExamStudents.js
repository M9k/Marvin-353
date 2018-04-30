import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Utils from '../custom/utils';
import FieldTypes from '../custom/fieldtypes';
import Form from '../custom/Form';
import ModalForm from '../custom/ModalForm';
import PageTableForm from '../template/PageTableForm';

import { creators as evaluatorCreators } from '../../sagas/EvaluatorSaga';

class TeacherExamStudents extends React.Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
    this.getStudentsOfThisExam = this.getStudentsOfThisExam.bind(this);
    this.addGradeBuilder = this.addGradeBuilder.bind(this);
    this.examId = this.props.params.examid;
    this.state = { viewModalAddVote: false };
  }

  getStudentsOfThisExam() {
    this.props.getStudentsOfExam(this.examId);
  }

  openModal(student) {
    console.log(student);
    this.setState({
      viewModalAddVote: true, studentIndex: student.index,
    });
  }

  addGradeBuilder(objForm) {
    this.props.addGradeToStudent(
      this.props.myWeb3Address,
      this.props.examIndex,
      this.state.studentIndex,
      objForm.grade,
    );
  }

  render() {
    return (
      <div>
        <h1>Exam - {this.examId}</h1>

        <ModalForm title="Setting the student grade" show={this.state.viewModalAddVote} >
          <Form
            description="What's the grade of the student?"
            fields={[{
              name: 'grade',
              label: 'Grade:',
              help: 'insert the student grade',
              placeholder: '25',
              type: FieldTypes.TEXT,
              validateFunction: Utils.validGrade,
            }]}
            submitFunction={this.addGradeBuilder}
          />
        </ModalForm>

        <PageTableForm
          getTableData={this.getStudentsOfThisExam}
          tableData={this.props.studentsOfExam}
          headerInfo={['name', 'surname', 'grade']}
          editTableData={this.openModal}
        />

      </div>
    );
  }
}

TeacherExamStudents.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  params: PropTypes.object.isRequired,
  studentsOfExam: PropTypes.arrayOf(Object).isRequired,
  getStudentsOfExam: PropTypes.func.isRequired,
  addGradeToStudent: PropTypes.func.isRequired,
  myWeb3Address: PropTypes.string.isRequired,
  examIndex: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  myWeb3Address: state.metamask.account,
  studentsOfExam: state.selectedExam.studentList.list,
  examIndex: state.selectedExam.studentList.index,
});

function mapDispatchToProps(dispatch) {
  return {
    getStudentsOfExam: examId => (
      dispatch(evaluatorCreators.getList(examId))
    ),
    addGradeToStudent: objArr => (
      dispatch(evaluatorCreators.assignVote(
        objArr.profAddress,
        objArr.examIndex,
        objArr.studentIndex,
        objArr.grade,
      ))
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherExamStudents);
