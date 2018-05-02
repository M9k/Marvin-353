import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from '../custom/Form';
import Utils from '../custom/utils';
import FieldTypes from '../custom/fieldtypes';
import ModalForm from '../custom/ModalForm';
import { creators } from '../../sagas/BookingSaga';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.addRole = this.addRole.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.state = { viewModalCourse: false };
  }

  componentDidMount() {
    this.props.getCourses();
  }

  addRole(objArr) {
    if (objArr.userType.value !== 'student') {
      this.props.signUp(objArr.name.value, objArr.surname.value);
    } else {
      this.setState({
        viewModalCourse: true,
        name: objArr.name.value,
        surname: objArr.surname.value,
      });
    }
  }

  addStudent(courseForm) {
    if (courseForm.courseCode.valid !== 0) {
      this.props.signUp(
        this.state.name,
        this.state.surname,
        this.props.coursesContracts[courseForm.courseCode.valid],
      );
    }
  }

  render() {
    return (
      <div>
        <Form
          description="Do you want to be part of Marvin University?"
          fields={[{
            name: 'name',
            label: 'Name:',
            help: 'insert your name',
            placeholder: 'luigi',
            type: FieldTypes.TEXT,
            validateFunction: Utils.existValue,
          }, {
            name: 'surname',
            label: 'Surname:',
            help: 'insert your surname',
            placeholder: 'rossi',
            type: FieldTypes.TEXT,
            validateFunction: Utils.existValue,
          }, {
            name: 'userType',
            label: 'Role:',
            help: 'insert your desired role',
            type: FieldTypes.SELECT,
            values: [null, 'student', 'teacher'],
            validateFunction: Utils.notNullValue,
          }]}
          submitFunction={this.addRole}
        />

        <ModalForm title="Select your course" show={this.state.viewModalCourse} >
          <Form
            description="choose the course/degree:"
            fields={[{
              name: 'courseCode',
              label: 'Code:',
              help: 'insert the code of the course',
              placeholder: 'A-36',
              type: FieldTypes.SELECT,
              values: [null].concat(this.props.coursesForStudent),
              validateFunction: Utils.notNullValue,
            }]}
            submitFunction={this.addStudent}
          />
        </ModalForm>

      </div>
    );
  }
}
Register.propTypes = {
  signUp: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired, // loadCourses
  coursesForStudent: PropTypes.arrayOf(String).isRequired,
  coursesContracts: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = state => ({
  coursesForStudent: state.signup.listNames,
  coursesContracts: state.signup.listAddress,
});

function mapDispatchToProps(dispatch) {
  return {
    signUp: (n, s, c) => dispatch(creators.performSignUp(n, s, c)),
    getCourses: () => dispatch(creators.performLoad((new Date()).getFullYear())),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

