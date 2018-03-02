import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
// import configureStore from 'redux-mock-store';
import ButtonLogOut from '../../../src/components/buttons/ButtonLogOut';


// unit tests for the App component
describe('ButtonLogOut component', () => {
  // mock
  // const mockStore = configureStore();
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<ButtonLogOut path="/" />);
      assert.equal(wrapper.length, 1);
    });
    it('should indicate the logout page if the path isn\'t /logout', () => {
      const wrapper = shallow(<ButtonLogOut path="test" />);
      assert.equal(wrapper.html().search('/logout') !== -1, true);
    });
    it('should NOT indicate the logout page if the path is /logout', () => {
      const wrapper = shallow(<ButtonLogOut path="/logout" />);
      assert.equal(wrapper.html().search('/logout') !== -1, false);
    });
    it('should have "Logout" as text', () => {
      const wrapper = shallow(<ButtonLogOut path="test" />);
      assert.equal(wrapper.html().search('Logout') !== -1, true);
    });
    it('should be a span if the path is "/logout"', () => {
      const wrapper = shallow(<ButtonLogOut path="/logout" />);
      assert.equal(wrapper.html().search('<span') !== -1, true);
    });
  });
});
