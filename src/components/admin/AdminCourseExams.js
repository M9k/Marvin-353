import React from 'react';
import PropTypes from 'prop-types';
import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import Form from '../custom/Form';

class AdminCourseExams extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.params;
  }

  componentDidMount() {
    console.log(this.params.examid);
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
      </div>
    );
  }
}

AdminCourseExams.propTypes = {
  params: PropTypes.string.isRequired,
};

export default AdminCourseExams;
