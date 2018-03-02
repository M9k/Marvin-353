import React from 'react';
import { shallow, configure } from 'enzyme';
import assert from 'assert';
import Adapter from 'enzyme-adapter-react-15';
import HomeFactory from '../../../src/components/home/HomeFactory';
import AccountTypes from '../../../src/components/AccountEnum';

configure({ adapter: new Adapter() });

// unit tests for the App component
describe('HomeFactory component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<HomeFactory />);
      assert.equal(wrapper.length, 1);
    });
    it('should have the AlertDismissable', () => {
      const wrapper = shallow(<HomeFactory />);
      assert.equal(wrapper.dive().find('AlertDismissable').length, 1);
    });
    it('with AccountTypes.NOTLOGGED as role should render the HomeDefault', () => {
      const wrapper = shallow(<HomeFactory accountType={AccountTypes.NOTLOGGED} />);
      assert.equal(wrapper.find('HomeDefault').length, 1);
    });
    it('with a wrong role should render the HomeDefault', () => {
      const wrapper = shallow(<HomeFactory accountType={1234567890} />);
      assert.equal(wrapper.find('HomeDefault').length, 1);
    });


    //                                                 TODO OTHER USER CASE
    //                                                 TODO OTHER USER CASE
    //                                                 TODO OTHER USER CASE
    //                                                 TODO OTHER USER CASE
    //                                                 TODO OTHER USER CASE
    //                                                 TODO OTHER USER CASE
    it('with AccountTypes.UNIVERSITY as role should render the ', () => {
      const wrapper = shallow(<HomeFactory accountType={AccountTypes.UNIVERSITY} />);
      assert.equal(wrapper.length, 1);
    });
    it('with AccountTypes.ADMIN as role should render the ', () => {
      const wrapper = shallow(<HomeFactory accountType={AccountTypes.ADMIN} />);
      assert.equal(wrapper.length, 1);
    });
    it('with AccountTypes.PROFESSOR as role should render the ', () => {
      const wrapper = shallow(<HomeFactory accountType={AccountTypes.PROFESSOR} />);
      assert.equal(wrapper.length, 1);
    });
    it('with AccountTypes.STUDENT as role should render the ', () => {
      const wrapper = shallow(<HomeFactory accountType={AccountTypes.STUDENT} />);
      assert.equal(wrapper.length, 1);
    });
    //                                                 TODO OTHER USER CASE
    //                                                 TODO OTHER USER CASE
    //                                                 TODO OTHER USER CASE
    //                                                 TODO OTHER USER CASE
    //                                                 TODO OTHER USER CASE
    //                                                 TODO OTHER USER CASE
  });
});
