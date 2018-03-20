import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import RemoveList from '../../../src/components/lists/RemoveList';
import { ListGroupItem, ListGroup, Button } from 'react-bootstrap';

require('jsdom-global')();

chai.use(chaiEnzyme());
const { expect } = chai;
configure({ adapter: new Adapter() });
let wrapper;

describe("<RemoveList/>", () => {
  it("should render the correct elements", () => {
    let wrapper = shallow(
      <RemoveList
      elements={['a', 'b', 'c', 'd']}
      removeFnc={() => (true)}
      />);
    expect(wrapper).to.have.exactly(4).descendants(ListGroupItem);
    expect(wrapper.find(ListGroup)).to.be.present();
  });
  it("should fire the remove events only when a correct button is clicked", () => {
    let result = 5;
    let wrapper = shallow(
      <RemoveList
        elements={['a']}
        removeFnc={() => {result = 0 }}
      />
    );
    let clickableButton = wrapper.find(ListGroupItem).first().find(Button).first();
    clickableButton.simulate('change', {target: {id: 2}, preventDefault: () => {}});
    clickableButton.simulate('keyup', {target: {id: 2}, preventDefault: () => {}});
    clickableButton.simulate('keydown', {target: {id: 2}, preventDefault: () => {}});
    clickableButton.simulate('keypress', {target: {id: 2}, preventDefault: () => {}});
    expect(result).to.equal(5);
    clickableButton.simulate('click', {target: {id: 2}, preventDefault: () => {}});
    expect(result).to.equal(0);
  });
});
