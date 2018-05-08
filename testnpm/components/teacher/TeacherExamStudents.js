

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import { TeacherExamStudents } from '../../../src/components/teacher/TeacherExamStudents';


describe('TeacherExamStudents component', () => {
  const initialState = {
    loading: false,
    errored: false,
    list: [],
  };


  const mockStore = configureStore();
  const profAddress = '0xb7a14c8A77d7D75A9dbEE0949F668A77a9AF0C90';
  const examIndex = 100;
  const paramPage = {
    examid: '0xc27f30b9268c7b46c3c8bc56489104a435d4516e',
  };
  const locationPage = { query: { code: 'prova', index: examIndex } };
  let wrapper;
  let store;
  let grade;

  function getStudents() {
  }

  function setGrade(
    profAdd, exIn,
    studentIndex, gradeS,
  ) {
    grade.profAddress = profAdd;
    grade.examIndex = exIn;
    grade.studentI = studentIndex;
    grade.studentGrade = gradeS;
  }

  beforeEach(() => {
    grade = {};
    store = mockStore(initialState);
    wrapper = shallow( // eslint-disable-line function-paren-newline
      <TeacherExamStudents
        params={paramPage}
        myWeb3Address={profAddress}
        studentsOfExam={{}}
        getStudentsOfExam={getStudents}
        addGradeToStudent={setGrade}
        location={locationPage}
        store={store}
      />);
  });


  it('Should show the form and table correctly with state', () => {
    expect(wrapper.find('div').children()).to.have.length(3);
    expect(wrapper.state().viewModalAddVote).to.equal(false);
  });

  it('Should openModal set right the state', () => {
    const student = { studentIndex: 0, name: 'mario' };
    wrapper.instance().openModal(student);
    expect(wrapper.state().viewModalAddVote).to.equal(true);
    expect(wrapper.state().studentIndex).to.equal(0);
  });

  it('Should build the right vote to send to redux', () => {
    const student = { studentIndex: 11, name: 'mario' };
    wrapper.instance().openModal(student);
    const objForm = { grade: { value: 25 } };
    wrapper.instance().addGradeBuilder(objForm);

    expect(grade.profAddress).to.equal(profAddress);
    expect(grade.examIndex).to.equal(examIndex);
    expect(grade.studentI).to.equal(11);
    expect(grade.studentGrade).to.equal(25);
  });
});
