import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import ButtonBackToHome from '../../../src/components/buttons/ButtonBackToHome';


// unit tests for the App component
describe('ButtonBackToHome component', () => {
  // mock
  // const Button = props => (<div>{props.link} {props.children}</div>);
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<ButtonBackToHome />);
      assert.equal(wrapper.length, 1);
    });
    it('should indicate the home page', () => {
      const wrapper = shallow(<ButtonBackToHome />);
      assert.equal(wrapper.html().search('/') !== -1, true);
    });
    it('should have "Go back to home" as text', () => {
      const wrapper = shallow(<ButtonBackToHome />);
      assert.equal(wrapper.html().search('Go back to home') !== -1, true);
    });
  });
});
