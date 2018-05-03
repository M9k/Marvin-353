import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { creators as examSagaAction } from '../../sagas/ManageExamsSaga';

import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import Form from '../custom/Form';
import PageTableForm from '../template/PageTableForm';
import ExamDetails from './ExamDetails';
import {creators as courseSagaAction} from "../../sagas/CourseSaga";

class AdminCourseExams extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showDetails: false };
    this.params = this.props.params;
    this.courseAdress = this.params.examid;
    this.getCourses = () => {};
    this.viewDetails = this.viewDetails.bind(this);
    this.addExamBuilder = this.addExamBuilder.bind(this);
    this.getExamsByAddress = this.getExamsByAddress.bind(this);
    this.course = {
      name: 'L-31',
      solarYear: '2017',
      courseAddress: '0xfae394561e33e242c551d15d4625309ea4c0b97f',
      totalCredits: 180,
    };
    /*
    this.examList = [
      {
        name: 'Programming',
        credits: '10',
        mandatory: true,
        professorName: 'Filè',
        professorSurname: 'Gilberto',
        professorAddress: '0x252dae0a4b9d9b80f504f6418acd2d364c0c59cd',
      },
      {
        name: 'Computer architecture',
        credits: '8',
        mandatory: true,
        professorName: 'Sperduti',
        professorSurname: 'Alessandro',
        professorAddress: '0x252dae0a4b9d9b80f504f6418acd2d364c0c59cd',
      },
      {
        name: 'Logic',
        credits: '6',
        mandatory: false,
        professorName: 'Maietti',
        professorSurname: 'Maria Emilia',
        professorAddress: '0x252dae0a4b9d9b80f504f6418acd2d364c0c59cd',
      },
      {
        name: 'Database',
        credits: '9',
        mandatory: true,
        professorName: '',
        professorSurname: '',
        professorAddress: '0x252dae0a4b9d9b80f504f6418acd2d364c0c59cd',
      },
    ];
    */
  }
  addExamBuilder(objForm) {
    const optional = objForm.optionalExam.value ? true : false;
    const array = [
      this.courseAdress,
      objForm.examName.value,
      objForm.examCredits.value,
      optional,
    ];
    this.props.addExam(array);
  }
  getExamsByAddress() {
    this.props.getExams(this.courseAdress);
  }
  viewDetails(item) {
    this.setState({ showDetails: true, item });
  }
  render() {
    let details = null;
    if (this.state.showDetails) {
      details = <ExamDetails object={this.state.item} show={this.state.showDetails} />;
    }
    console.log(this.props.examList);
    return (
      <div>
        <h3 className="text-center">Course {this.params.examid}</h3>
        <dl>
          <dt>Name</dt>
          <dd>{this.course.name}</dd>
          <dt>Solar year</dt>
          <dd>{this.course.solarYear}</dd>
          <dt>Total credits</dt>
          <dd>{this.course.totalCredits}</dd>
          <dt>Address</dt>
          <dd>{this.course.courseAddress}</dd>
        </dl>
        <Form
          description="Add a new exam"
          fields={[
            {
              name: 'examName',
              label: 'Name:',
              help: 'insert the name of the exam',
              placeholder: 'mathematics',
              type: FieldTypes.TEXT,
              validateFunction: Utils.notNullValue,
            },
            {
              name: 'examCredits',
              label: 'Credits:',
              help: 'insert the number of credits',
              placeholder: '9',
              type: FieldTypes.TEXT,
              validateFunction: Utils.positiveNumber,
            },
            {
              name: 'optionalExam',
              label: 'Optional:',
              help: 'is the exam optional',
              type: FieldTypes.CHECKBOX,
              values: ['yes'],
              validateFunction: Utils.alwaysTrue,
            },
          ]}
          submitFunction={this.addExamBuilder}
        />
        <PageTableForm
          getTableData={this.getExamsByAddress}
          tableData={this.props.examList}
          headerInfo={['Name', 'Credits', 'Mandatory', 'TeacherName', 'TeacherSurname', 'Details']}
          tableButtons={[{
            buttonFunction: this.viewDetails,
            buttonText: 'Details',
            buttonType: 'default',
          }]}
          columFilter
        />
        {details}
      </div>
    );
  }
}

AdminCourseExams.propTypes = {
  params: PropTypes.string.isRequired,
  getExams: PropTypes.func.isRequired,
  addExam: PropTypes.func.isRequired,
  // validExam: PropTypes.func.isRequired,
  examList: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = state => ({
  courseList: state.course.coursesList,
  academicYears: state.manageYears.accademicYears,
  examList: state.courseExams.list,
});

function mapDispatchToProps(dispatch) {
  return {
    addExam: objArray => (
      dispatch(examSagaAction.addNewExamAction(
        objArray[0],
        objArray[1],
        objArray[2],
        objArray[3],
      ))
    ),
    getExams: courseAddress => dispatch(examSagaAction.getExamsByCourseAction(courseAddress)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCourseExams);
