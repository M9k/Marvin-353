import React from 'react';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import { Button } from 'react-bootstrap';
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { ExamDetails } from '../../../src/components/admin/ExamDetails';
import ModalForm from '../../../src/components/custom/ModalForm';

const exam1 = {
  name: 'Programming',
  credits: '10',
  courseName: 'L-16',
  year: '2017',
  teacherName: 'Gilberto',
  teacherSurname: 'Filè',
  examAddress: '0x811da72aca31e56f770fc33df0e45fd08720e157',
  mandatory: true,
  courseAddress: '0x4bd1280852cadb002734647305afc1db7ddd6acb',
  teacherAddress: '0x79196b90d1e952c5a43d4847caa08d50b967c34a',
};
const exam2 = {
  name: 'Programming',
  credits: '10',
  courseName: 'L-16',
  year: '2017',
  teacherName: '',
  teacherSurname: '',
  examAddress: '0x811da72aca31e56f770fc33df0e45fd08720e157',
  mandatory: true,
  courseAddress: '0x4bd1280852cadb002734647305afc1db7ddd6acb',
  teacherAddress: '',
};
describe('DetailsButton component', () => {
  const initialState = {
    loading: false,
    errored: false,
    teacherList: [],
  };
  const mockStore = configureStore();
  let wrapper1;
  let wrapper2;
  let store;
  beforeEach(() => { // eslint-disable-line max-len
    store = mockStore(initialState);
    wrapper1 = shallow( // eslint-disable-line function-paren-newline
      <ExamDetails
        object={exam1}
        show
        getTeachers={e => e}
        setTeacher={e => e}
        store={store}
      />);
    wrapper2 = shallow(<ExamDetails object={exam2} show getTeachers={e => e} setTeacher={e => e} store={store} />); // eslint-disable-line max-len
  });
  it('Should render the component', () => {
    assert.equal(wrapper1.length, 1);
    expect(wrapper1.find(ModalForm)).to.have.length(2);
  });
  it('Should have the correct initial state', () => {
    expect(wrapper1.state().assignTeacher).to.equal(false);
    expect(wrapper1.state().teacherAddress).to.equal(null);
  });
  it('Should get the teacher list', () => {
    wrapper1.simulate('getTeachers');
    // const actions = store.getActions();
    // expect(actions).to.equal([{ type: 'GET_TEACHERS' }]);
  });
  it('Should render the Assign Teacher Button if the teacher is not set', () => {
    expect(wrapper2.find(Button)).to.have.length(1);
  });
});

