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
    this.course = {
      name: 'L-31',
      solarYear: '2017',
      courseAddress: '0xfae394561e33e242c551d15d4625309ea4c0b97f',
      totalCredits: 180,
    };
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
  }

  render() {
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
          submitFunction={null}
        />
        <PageTableForm
          getTableData={this.getCourses}
          tableData={this.examList}
          headerInfo={['name', 'credits', 'mandatory', 'professorName', 'professorSurname', 'details']}
          detailTableData
          columFilter
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
  // examList: PropTypes.arrayOf(Object).isRequired,
};

export default AdminCourseExams;
