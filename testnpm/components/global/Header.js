import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import Header from '../../../src/components/global/Header';

// unit tests for the App component
describe('Header component', () => {
  //mock
  const WelcomeLabel = props => (<div id="WelcomeLabel">{props.text}</div>);
  describe('render()', () => {
    it('should render the component', () => {
      const props = { welcome: '' };
      const wrapper = shallow(<Header {...props} >Children</Header>);
      assert.equal(wrapper.length, 1);
    });
    it('should show the children in a div with id "headerLinks"', () => {
      const props = { welcome: '' };
      const wrapper = shallow(<Header {...props} >Children</Header>);
      assert.equal(wrapper.containsMatchingElement(<div id="headerLinks">Children</div>), true);
    });
    it('should send the welcome text to WelcomeLabel', () => {
      const props = { welcome: 'The right welcome text' };
      const wrapper = shallow(<Header {...props} >Children</Header>);
      assert.equal(wrapper.html().search(<div id="WelcomeLabel">The right welcome text</div>) !== -1, true);
    });
  });
});
