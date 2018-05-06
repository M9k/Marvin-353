import React from 'react';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { AdminExams } from '../../../src/components/admin/AdminExams';
import PageTableForm from '../../../src/components/template/PageTableForm';

const academicYears = [
  2018,
  2019,
  2020,
];

const examList = [
  {
    address: '0x36a629386700746989d6c5995ba750e7cdf8822c',
    courseAddress: '0x77fa427aa4600e31e2f32c129217631320cd0534',
    courseName: 'p-48',
    credits: 12,
    mandatory: false,
    name: 'lopo',
    professorName: 'mario',
    professorSurname: 'rossi',
    solarYear: 2019,
    teacherAddress: '0xa4a72bbb711a4b81e60dc4d7a952d209c51f80e0',
    teacherName: 'mario',
    teacherSurname: 'rossi',
  },
];

const nextProps = {
  examList: { examList },
  academicYears: { academicYears },
};

describe('AdminExams component', () => {
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
  let wrapper2;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow( // eslint-disable-line function-paren-newline
      <AdminExams
        examList={examList}
        getYears={e => e}
        getAllExams={e => e}
        academicYears={academicYears}
        yearLoading={false}
        listLoading={false}
        store={store}
      />);
    wrapper2 = shallow( // eslint-disable-line function-paren-newline
      <AdminExams
        examList={null}
        getYears={e => e}
        getAllExams={e => e}
        academicYears={academicYears}
        yearLoading={false}
        listLoading
        store={store}
      />);
  });
  it('Should render the component', () => {
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(FormGroup)).to.have.length(1);
    expect(wrapper.find(ControlLabel)).to.have.length(1);
    expect(wrapper.find(FormControl)).to.have.length(1);
    expect(wrapper.find(PageTableForm)).to.have.length(1);
  });
  it('Should non render the table if the table is not loading', () => {
    assert.equal(wrapper2.length, 1);
    expect(wrapper2.find(FormGroup)).to.have.length(1);
    expect(wrapper2.find(ControlLabel)).to.have.length(1);
    expect(wrapper2.find(FormControl)).to.have.length(1);
    expect(wrapper2.find(PageTableForm)).to.have.length(0);
  });
  it('Should non render the year options if the year list is not loading', () => {
    assert.equal(wrapper2.length, 1);
    expect(wrapper2.find(FormGroup)).to.have.length(1);
    expect(wrapper2.find(ControlLabel)).to.have.length(1);
    expect(wrapper2.find(FormControl)).to.have.length(1);
    expect(wrapper2.find(PageTableForm)).to.have.length(0);
    expect(wrapper.html().search('<options') !== -1, false);
  });
  it('Should have the correct initial state', () => {
    expect(wrapper.state().showDetails).to.equal(false);
  });
  it('Should call componentWillReceiveProps(nextProps)', () => {
    wrapper2.instance().componentWillReceiveProps(nextProps);
    expect(wrapper2.state().year).to.equal(nextProps.academicYears[0]);
  });
  it('Should call viewDetails(item)', () => {
    wrapper2.instance().viewDetails(examList[0]);
    expect(wrapper2.state().showDetails).to.equal(true);
    expect(wrapper2.state().item).to.equal(examList[0]);
  });
});
