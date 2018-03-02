import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
// import configureStore from 'redux-mock-store';
import ButtonHelp from '../../../src/components/buttons/ButtonHelp';

// unit tests for the App component
describe('ButtonHelp component', () => {
  // mock
  // const mockStore = configureStore();
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<ButtonHelp path="/" />);
      assert.equal(wrapper.length, 1);
    });
    it('should indicate the help page if the path isn\'t "/help"', () => {
      const wrapper = shallow(<ButtonHelp path="test" />);
      assert.equal(wrapper.html().search('/help') !== -1, true);
    });
    it('should NOT indicate the help page if the path is "/help"', () => {
      const wrapper = shallow(<ButtonHelp path="/help" />);
      assert.equal(wrapper.html().search('/help') !== -1, false);
    });
    it('should have "Help" as text', () => {
      const wrapper = shallow(<ButtonHelp path="test" />);
      assert.equal(wrapper.html().search('Help') !== -1, true);
    });
    it('should be a span if the path is "/help"', () => {
      const wrapper = shallow(<ButtonHelp path="/help" />);
      assert.equal(wrapper.html().search('<span') !== -1, true);
    });
  });
});
