/* import React from 'react';
import { mount, shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import ExamDetails from '../../../src/components/admin/ExamDetails';
import ModalForm from '../../../src/components/custom/ModalForm';

const exam = {
  name: 'Programming',
  credits: '10',
  courseName: 'L-16',
  year: '2017',
  professorName: 'Gilberto',
  professorSurname: 'Filè',
  examAddress: '0x811da72aca31e56f770fc33df0e45fd08720e157',
  mandatory: true,
  courseAddress: '0x4bd1280852cadb002734647305afc1db7ddd6acb',
  professorAddress: '0x79196b90d1e952c5a43d4847caa08d50b967c34a',
};
describe('DetailsButton component', () => {
  it('Should render the component', () => {
    const wrapper = shallow(<ExamDetails object={exam} show={e => e} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(ModalForm)).to.have.length(2);
  });

  it('Should open change the state and show the modal when Details Button is clicked', () => {
    const wrapper = shallow(<ExamDetails object={exam} show={e => e} />);
    const detailsButton = wrapper.find(Button);
    detailsButton.simulate('click');
    expect(wrapper.state().show).to.equal(true);
  });

  it('Should have the correct props', () => {
    const wrapper = mount(<ExamDetails
      object={exam}
      show={e => e}
    />);
    expect(wrapper.props().object).to.equal(exam);
  });
});
*/
