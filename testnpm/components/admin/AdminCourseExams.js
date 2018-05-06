import React from 'react';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { AdminCourseExams } from '../../../src/components/admin/AdminCourseExams';
import Form from '../../../src/components/custom/Form';
import PageTableForm from '../../../src/components/template/PageTableForm';

const params = {
  examid: '0xe048078187ff40fa67b429ff1eeb82265f7c115a',
};

const location = {
  action: 'POP',
  hash: '',
  key: null,
  pathname: '/courses/0xe048078187ff40fa67b429ff1eeb82265f7c115a/',
  query:
    {
      name: 'G-44',
      year: '2018',
    },
  search: '?name=G-44&year=2018',
};

const exam = {
  address: '0xec4817cc93b96c61e9eb5be86d8e87f882fc0ac0',
  credits: 12,
  mandatory: false,
  name: 'math',
  professorName: '',
  professorSurname: '',
  teacherAddress: '0x0000000000000000000000000000000000000000',
  teacherName: '',
  teacherSurname: '',
};

const objForm = {
  examCredits: {
    index: 1,
    valid: 1,
    value: '3',
  },
  examName: {
    index: 0,
    valid: 1,
    value: 'eng',
  },
  optionalExam: {
    index: 2,
    valid: 1,
    value: '',
  },
};

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
      <AdminCourseExams
        params={params}
        addExam={e => e}
        location={location}
        store={store}
      />);
  });
  it('Should render the component', () => {
    assert.equal(wrapper.length, 1);
    expect(wrapper.html().search('<h1') !== -1, true);
    expect(wrapper.find(Form)).to.have.length(1);
    expect(wrapper.find(PageTableForm)).to.have.length(1);
  });
  it('Should have the correct initial state', () => {
    expect(wrapper.state().showDetails).to.equal(false);
  });
  it('Should change state when a button Details is clicked', () => {
    wrapper.instance().viewDetails(exam);
    expect(wrapper.state().showDetails).to.equal(true);
  });
  it('Should call addExamBuilder(objForm)', () => {
    wrapper.instance().addExamBuilder(objForm);
  });
  it('Should call getExamsByAddress()', () => {
    wrapper.instance().getExamsByAddress();
  });
});
