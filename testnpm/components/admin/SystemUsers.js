import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { expect } from '../../helpers/chai-enzyme';
import ContainerComponent, { SystemUsers as SimpleComponent } from
  '../../../src/components/admin/SystemUsers';
import PageTable from '../../../src/components/template/PageTableForm';
import { shallowWithStore, createMockStore } from '../../helpers/component-with-store';
import { creators } from '../../../src/sagas/AdminSaga';
import ROLES from '../../../src/util/logic/AccountEnum';

const add = {
  contract: '0xfa429bef26906146be2438c1892f8499e217b277',
  address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
  name: 'TeacherName',
  surname: 'TeacherSurname',
};
const roleT = ROLES.TEACHER;
const roleS = ROLES.STUDENT;
const teachers = [{
  contract: '0xfa429bef26906146be2438c1892f8499e217b277',
  address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
  name: 'TeacherUserName',
  surname: 'TeacherUserSurname',
}];
const students = [{
  contract: '0xfa429bef26906146be2438c1892f8499e217b277',
  address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
  name: 'StudentUserName',
  surname: 'StudentUserSurname',
}];
const defaultStore = {
  accounts: {
    loading: false,
    errored: false,
    studentsList: [{
      contract: '0xfa429bef26906146be2438c1892f8499e217b277',
      address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
      name: 'StudentUserName',
      surname: 'StudentUserSurname',
    }],
    teachersList: [{
      contract: '0xfa429bef26906146be2438c1892f8499e217b277',
      address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
      name: 'TeacherUserName',
      surname: 'TeacherUserSurname',
    }],
    pendingStudentsList: [],
    pendingTeachersList: [],
  },
};

describe('SystemUsers component', () => {
  // Testing simple component
  const SimpleWrapper = shallow(<SimpleComponent
    getTeachers={e => e}
    getStudents={e => e}
    deleteTeacher={e => e}
    deleteStudent={e => e}
    teacherAccounts={teachers}
    studentAccounts={students}
  />);
  it('Should render the simple component', () => {
    assert.equal(SimpleWrapper.length, 1);
  });
  it('Should render the child components', () => {
    expect(SimpleWrapper.find(PageTable)).to.have.length(2);
  });

  // Testing container part
  it('Should connect right to the props', () => {
    const wrapper = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapper.props().teacherAccounts).to.deep.equal(teachers);
    expect(wrapper.props().teacherAccounts).to.be.an('array');
    expect(wrapper.props().studentAccounts).to.deep.equal(students);
    expect(wrapper.props().studentAccounts).to.be.an('array');
  });
  it('Should fire the correct actions for getting lists', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().getTeachers();
    wrapper.props().getStudents();
    expect(store.isActionDispatched(creators.getAllTEachersAction())).to.be.true;
    expect(store.isActionDispatched(creators.getAllStudentsAction())).to.be.true;
  });
  it('Should fire the student users action for delete', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().deleteStudent(add);
    expect(store.isActionDispatched(creators.removeUserAction(roleS, add.contract))).to.be.true;
  });
  it('Should fire the teacher users action for delete', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().deleteTeacher(add);
    expect(store.isActionDispatched(creators.removeUserAction(roleT, add.contract))).to.be.true;
  });
});
