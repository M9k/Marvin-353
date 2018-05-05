import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai';
import ConfirmTeachers from '../../../src/components/admin/ConfirmTeacherUser';

const teachers = [{
  contract: '0xfa429bef26906146be2438c1892f8499e217b277',
  address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
  name: 'TeacherName',
  surname: 'TeacherSurname',
}];

describe('ConfirmTeachers component', () => {
  let wrapper;
  let store;
  beforeEach(() => {
    const mockStore = configureStore();
    const initialState = {
      accounts: {
        loading: false,
        errored: false,
        studentsList: [],
        teachersList: [],
        pendingStudentsList: [],
        pendingTeachersList: [{
          contract: '0xfa429bef26906146be2438c1892f8499e217b277',
          address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
          name: 'TeacherName',
          surname: 'TeacherSurname',
        }],
      },
    };
    store = mockStore(initialState);
    wrapper = shallow( // eslint-disable-line function-paren-newline
      <ConfirmTeachers
        store={store}
      />);
  });
  it('Should render the component', () => {
    assert.equal(wrapper.length, 1);
  });

  it('Should have correct array of teachers in the store', () => {
    expect(wrapper.props().pendingTeachers).to.deep.equal(teachers);
  });
});
