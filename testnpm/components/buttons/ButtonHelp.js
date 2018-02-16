import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import ButtonHelp from '../../../src/components/buttons/ButtonHelp';


// unit tests for the App component
describe('ButtonHelp component', () => {
  //mock
  const Button = props => (<div>{props.link} {props.children}</div>);
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<ButtonHelp />);
      assert.equal(wrapper.length, 1);
    });
    it('should indicate the help page', () => {
      const wrapper = shallow(<ButtonHelp />);
      assert.equal(wrapper.html().search('/help') !== -1, true);
    });
    it('should have "Help" as text', () => {
      const wrapper = shallow(<ButtonHelp />);
      assert.equal(wrapper.html().search('Help') !== -1, true);
    });
  });
});
