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
    expect(wrapper.find(Form)).to.have.length(1);
    expect(wrapper.find(PageTableForm)).to.have.length(1);
  });
  it('Should have the correct initial state', () => {
    expect(wrapper.state().showDetails).to.equal(false);
  });
  /*
  it('Should change state when a button Details is clicked', () => {
    wrapper.simulate('viewDetails');
    expect(wrapper.state().showDetails).to.equal(true);
  });
  */
});
