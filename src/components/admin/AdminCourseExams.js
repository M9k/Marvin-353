import React from 'react';
import PropTypes from 'prop-types';
import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import Form from '../custom/Form';
import PageTableForm from '../template/PageTableForm';

class AdminCourseExams extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.params;
    this.getCourses = () => {};
    this.exams = [
      {
        name: 'Programming',
        credits: '10',
        teacher_surname: 'Filè',
        teacher_name: 'Gilberto',
      },
      {
        name: 'Computer architecture',
        credits: '8',
        teacher_surname: 'Sperduti',
        teacher_name: 'Alessandro',
      },
      {
        name: 'Logic',
        credits: '6',
        teacher_surname: 'Maietti',
        teacher_name: 'Maria Emilia',
      },
      {
        name: 'Database',
        credits: '9',
        teacher_surname: '',
        teacher_name: '',
      },
    ];
  }

  render() {
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
          headerInfo={['Name', 'Credits', 'Teacher surname', 'Teacher name', 'Details']}
          detailTableData={true} // eslint-disable-line
        />
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
