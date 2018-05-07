import React from 'react';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { Register } from '../../../src/components/public/Register';
import Form from '../../../src/components/custom/Form';
import ModalForm from '../../../src/components/custom/ModalForm';

const objForm = {
  name: {
    index: 0,
    valid: 1,
    value: 'pippo',
  },
  surname: {
    index: 1,
    valid: 1,
    value: 'pippo',
  },
  userType: {
    index: 2,
    valid: 1,
    value: 'student',
  },
};

const objForm2 = {
  name: {
    index: 0,
    valid: 1,
    value: 'pluto',
  },
  surname: {
    index: 1,
    valid: 1,
    value: 'pluto',
  },
  userType: {
    index: 2,
    valid: 1,
    value: 'teacher',
  },
};

const objCourse = {
  courseCode: {
    index: 0,
    valid: 1,
    value: 'P-44',
  },
};

const coursesContracts = [
  '0xe4418428b04b8e8173e427511cb974ec054fd7ef',
];

const coursesForStudent = [
  'P-44',
];

describe('AdminCourseExams component', () => {
  const initialState = {
    loading: false,
    errored: false,
    studentsList: [],
    teachersList: [],
    pendingStudentsList: [],
    pendingTeachersList: [],
  };
  const mockStore = configureStore();
  let wrapper;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow( // eslint-disable-line function-paren-newline
      <Register
        store={store}
        signUp={e => e}
        getCourses={e => e}
        coursesForStudent={coursesForStudent}
        coursesContracts={coursesContracts}
      />);
  });
  it('Should render the component', () => {
    assert.equal(wrapper.length, 1);
    expect(wrapper.html().search('<h1') !== -1, true);
    expect(wrapper.find(Form)).to.have.length(2);
    expect(wrapper.find(ModalForm)).to.have.length(1);
  });
  it('Should have the correct initial state', () => {
    expect(wrapper.state().viewModalCourse).to.equal(false);
  });
  it('Should call componentDidMount()', () => {
    wrapper.instance().componentDidMount();
  });
  it('Should call addRole(objArr) to register a new student', () => {
    wrapper.instance().addRole(objForm);
    expect(wrapper.state().viewModalCourse).to.equal(true);
    expect(wrapper.state().name).to.equal(objForm.name.value);
    expect(wrapper.state().surname).to.equal(objForm.surname.value);
  });
  it('Should call addRole(objArr) to register a new teacher', () => {
    wrapper.instance().addRole(objForm2);
  });
  it('Should call addStudent(courseForm) to set the course of a new student', () => {
    wrapper.instance().addStudent(objCourse);
    expect(wrapper.state().viewModalCourse).to.equal(false);
    expect(wrapper.state().name).to.equal('');
    expect(wrapper.state().surname).to.equal('');
  });
});