import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { expect } from '../../helpers/chai-enzyme';
import ContainerComponent, { ConfirmStudent as SimpleComponent } from
  '../../../src/components/admin/ConfirmStudentUser';
import PageTable from '../../../src/components/template/PageTableForm';
import { shallowWithStore, createMockStore } from '../../helpers/component-with-store';
import { creators } from '../../../src/sagas/AdminSaga';
import ROLES from '../../../src/util/logic/AccountEnum';

const student = {
  item: {
    contract: '0xfa429bef26906146be2438c1892f8499e217b277',
    address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
    name: 'StudentName',
    surname: 'StudentName',
  },
};
const role = ROLES.UNCONFIRMED_STUDENT;
const contract = '0xfa429bef26906146be2438c1892f8499e217b277';
const students = [{
  contract: '0xfa429bef26906146be2438c1892f8499e217b277',
  address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
  name: 'StudentName',
  surname: 'StudentName',
}];
const defaultStore = {
  accounts: {
    loading: false,
    errored: false,
    studentsList: [],
    teachersList: [],
    pendingTeachersList: [],
    pendingStudentsList: [{
      contract: '0xfa429bef26906146be2438c1892f8499e217b277',
      address: '0x1eff47bc3a10a45d4b230b5d10e37751fe6aa718',
      name: 'StudentName',
      surname: 'StudentName',
    }],
  },
};

describe('ConfirmTeachers component', () => {
  // Testing simple component

  const SimpleWrapper = shallow(<SimpleComponent
    confirmStudent={e => e}
    getPendingStudents={e => e}
    denyStudent={e => e}
    pendingStudents={students}
  />);
  it('Should render the simple component', () => {
    assert.equal(SimpleWrapper.length, 1);
  });
  it('Should render the child components', () => {
    expect(SimpleWrapper.find(PageTable)).to.have.length(1);
  });

  // Testing container part
  it('Should connect right to the props', () => {
    const wrapper = shallowWithStore(<ContainerComponent />, defaultStore);
    expect(wrapper.props().pendingStudents).to.deep.equal(students);
    expect(wrapper.props().pendingStudents).to.be.an('array');
  });
  it('Should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<ContainerComponent />, store);
    wrapper.props().confirmStudent(student);
    wrapper.props().denyStudent(student);
    wrapper.props().getPendingStudents();
    expect(store.isActionDispatched(creators.getPendingStudentsAction())).to.be.true;
    expect(store.isActionDispatched(creators.approveUserAction(role, contract))).to.be.true;
    expect(store.isActionDispatched(creators.denyUserAction(role, contract))).to.be.true;
  });
});
