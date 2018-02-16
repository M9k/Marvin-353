import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import ButtonPrice from '../../../src/components/buttons/ButtonPrice';


// unit tests for the App component
describe('ButtonPrice component', () => {
  //mock
  const Button = props => (<div>{props.link} {props.children}</div>);
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<ButtonPrice />);
      assert.equal(wrapper.length, 1);
    });
    it('should indicate the price page', () => {
      const wrapper = shallow(<ButtonPrice />);
      assert.equal(wrapper.html().search('/price') !== -1, true);
    });
    it('should have "Price" as text', () => {
      const wrapper = shallow(<ButtonPrice />);
      assert.equal(wrapper.html().search('Price') !== -1, true);
    });
  });
});
