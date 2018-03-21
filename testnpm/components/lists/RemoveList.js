import React from 'react';
import { shallow } from 'enzyme';
import { ListGroupItem, ListGroup, Button } from 'react-bootstrap';
import RemoveList from '../../../src/components/lists/RemoveList';
import { expect } from '../../helpers/react-setup';

describe('<RemoveList/>', () => {
  it('should render the correct elements', () => {
    const wrapper = shallow(<RemoveList
      elements={['a', 'b', 'c', 'd']}
      removeFnc={() => (true)}
    />);
    expect(wrapper).to.have.exactly(4).descendants(ListGroupItem);
    expect(wrapper.find(ListGroup)).to.be.present();
  });
  it('should fire the remove events only when a correct button is clicked', () => {
    let result = 5;
    const wrapper = shallow(<RemoveList
      elements={['a']}
      removeFnc={() => { result = 0; }}
    />);
    const clickableButton = wrapper.find(ListGroupItem).first().find(Button).first();
    clickableButton.simulate('change', { target: { id: 2 }, preventDefault: () => {} });
    clickableButton.simulate('keyup', { target: { id: 2 }, preventDefault: () => {} });
    clickableButton.simulate('keydown', { target: { id: 2 }, preventDefault: () => {} });
    clickableButton.simulate('keypress', { target: { id: 2 }, preventDefault: () => {} });
    expect(result).to.equal(5);
    clickableButton.simulate('click', { target: { id: 2 }, preventDefault: () => {} });
    expect(result).to.equal(0);
  });
});
