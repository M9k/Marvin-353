

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import { TeacherExams } from '../../../src/components/teacher/TeacherExams';

describe('TeacherExams component', () => {
  const initialState = {
    loading: false,
    errored: false,
    list: [],
  };

  const exams = [
    {
      code: 'prova2',
      courseName: 'INFO',
      index: 0,
      address: '0xc27f30b9268c7b46c3c8bc56489104a435d4516e',
    },
    {
      code: 'prova',
      courseName: 'INFO',
      index: 1,
      address: '0x30940b8cabc181f359cf15afc0791811e3c018f4',
    },
  ];

  const mockStore = configureStore();
  const realAddr = '0xb7a14c8A77d7D75A9dbEE0949F668A77a9AF0C90';
  let address;
  let wrapper;
  let store;

  function getAssAddrExam(e) {
    address = e;
  }

  beforeEach(() => {
    address = '';
    store = mockStore(initialState);
    wrapper = shallow( // eslint-disable-line function-paren-newline
      <TeacherExams
        getMyAssignedExams={getAssAddrExam}
        assignedExams={exams}
        myContract={realAddr}
        store={store}
      />);
  });


  it('Should show the table correctly', () => {
    expect(wrapper.find('div').children()).to.have.length(1);
  });

  it('Should get the exams from teacher address passed to him', () => {
    expect(address).to.equal('');
    wrapper.instance().getMyAssignedExamsAddr();
    expect(address).to.equal(realAddr);
  });
});
