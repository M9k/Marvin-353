import React from 'react';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { AdminCourses } from '../../../src/components/admin/AdminCourses';
import Form from '../../../src/components/custom/Form';
import PageTableForm from '../../../src/components/template/PageTableForm';

const courseList = [
  {
    address: '0xe048078187ff40fa67b429ff1eeb82265f7c115a',
    credits: 180,
    name: 'G-44',
    year: 2018,
  },
  {
    address: '0x06cf7e8b937cc9665c99656d46145c5025475dd8',
    credits: 300,
    name: 'B-44',
    year: 2019,
  },
];

const academicYears = [
  2018,
  2019,
  2020,
];

describe('AdminCourses component', () => {
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
      <AdminCourses
        addCourse={e => e}
        getCourses={e => e}
        courseList={courseList}
        getYears={e => e}
        academicYears={academicYears}
        store={store}
      />);
  });
  it('Should render the component', () => {
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Form)).to.have.length(1);
    expect(wrapper.find(FormGroup)).to.have.length(1);
    expect(wrapper.find(ControlLabel)).to.have.length(1);
    expect(wrapper.find(FormControl)).to.have.length(1);
    expect(wrapper.find(PageTableForm)).to.have.length(1);
  });
  it('Should have the correct initial state', () => {
    expect(wrapper.state().year).to.equal('ALL');
  });
});

