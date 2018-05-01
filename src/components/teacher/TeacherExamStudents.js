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
    this.examCode = this.props.params.examid;
    this.state = { viewModalAddVote: false };
  }

  /**
   * get Students of the exam with coude found in the Url examid - examCode
   */
  getStudentsOfThisExam() {
    this.props.getStudentsOfExam(this.examCode);
  }

  /**
   * open the modal to set the grade of a student
   * @param student infos taken from the table row, need the index of him
   * to call the redux function on yesFunction of the Modal
   */
  openModal(student) {
    console.dir(student);
    this.setState({
      viewModalAddVote: true, studentIndex: student.index,
    });
  }

  /**
   * Create the right sequence of values to set a grade to a studet
   * fetching the info from the current exam in the props plus
   * 1 value studentIndex in the store set by openModal function
   * @param objForm contains the value of the grade of the student in
   * the section as declared in the form
   */
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
        <h1>Exam - {this.examCode}</h1>

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
          headerInfo={['Name', 'Surname', 'Grade']}
          tableButtons={[
            {
              buttonFunction: this.openModal,
              buttonText: 'Set vote',
              buttonType: 'primary',
            },
          ]}
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
