import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import Form from '../custom/Form';
import PageTableForm from '../template/PageTableForm';
import ModalForm from '../custom/ModalForm';

class AdminCourseExams extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.params;
    this.getCourses = () => {};
    this.exams = [
      {
        name: 'Programming',
        credits: '10',
        teacher: 'Gilberto Filè',
      },
      {
        name: 'Computer architecture',
        credits: '8',
        teacher: 'Alessandro Sperduti',
      },
      {
        name: 'Logic',
        credits: '6',
        teacher: 'Maria Emilia Maietti',
      },
      {
        name: 'Database',
        credits: '9',
        teacher: '',
      },
    ];
    this.teachers = [
      'Teacher 1',
      'Teacher 2',
      'Teacher 3',
    ];
    this.state = { assignTeacher: false };
    this.showAssignTeacher = this.showAssignTeacher.bind(this);
  }

  componentDidMount() {
    console.log(this.params.examid);
  }

  showAssignTeacher() {
    console.log('ADD TEACHER');
    this.setState({ assignTeacher: true });
  }

  render() {
    const options = [];
    for (let i = 0; i < this.teachers.length; i += 1) {
      options.push(<option value={this.teachers[i]}>{this.teachers[i]}</option>);
    }
    return (
      <div>
        <h3 className="text-center">Course {this.params.examid}</h3>
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
          submitFunction={null}
        />
        <PageTableForm
          getTableData={this.getCourses}
          tableData={this.exams}
          headerInfo={['Name', 'Credits', 'Teacher', 'Assign']}
          addTeacher={this.showAssignTeacher}
        />
        <ModalForm
          title="Assign teacher"
          show={this.state.assignTeacher}
          yesFunction={e => e}
        >
          <FormGroup controlId="selectTeacher">
            <ControlLabel>Assign a teacher to the exam</ControlLabel>
            <FormControl
              onChange={e => e}
              inputRef={el => this.inputEl = el} // eslint-disable-line no-return-assign
              componentClass="select"
              placeholder="select"
            >
              {options}
            </FormControl>
          </FormGroup>
        </ModalForm>
      </div>
    );
  }
}

AdminCourseExams.propTypes = {
  params: PropTypes.string.isRequired,
  // getExams: PropTypes.func.isRequired,
  // addExam: PropTypes.func.isRequired,
  // validExam: PropTypes.func.isRequired,
  // setTeacher: PropTypes.func.isRequired,
};

export default AdminCourseExams;
