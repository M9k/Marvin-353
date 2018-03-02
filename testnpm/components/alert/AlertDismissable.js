import React from 'react';
// import ReactTestUtils from 'react-dom/test-utils';
import { shallow } from 'enzyme';
import assert from 'assert';
import AlertDismissable from '../../../src/components/alert/AlertDismissable';

// unit tests for the AlertDismissable component
describe('AlertDismissable component', () => {
  describe('render()', () => {
    // render component
    it('should render the component with type = "success"', () => {
      const props = { type: 'success' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.length, 1);
    });
    it('should render the component with type = "warning"', () => {
      const props = { type: 'warning' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.length, 1);
    });
    it('should render the component with type = "danger"', () => {
      const props = { type: 'danger' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.length, 1);
    });
    it('should render the component with type = "info"', () => {
      const props = { type: 'info' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.length, 1);
    });
    // have the correct children
    it('should render the correct children with type = "success"', () => {
      const props = { type: 'success' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.html().search('children') !== -1, true);
    });
    it('should render the correct children with type = "warning"', () => {
      const props = { type: 'warning' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.html().search('warning') !== -1, true);
    });
    it('should render the correct children with type = "danger"', () => {
      const props = { type: 'danger' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.html().search('children') !== -1, true);
    });
    it('should render the correct children with type = "info"', () => {
      const props = { type: 'info' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.html().search('children') !== -1, true);
    });
    // show the correct title
    it('should render the correct title with type = "success"', () => {
      const props = { type: 'success' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.containsMatchingElement(<h4>Success!</h4>), true);
    });
    it('should render the correct title with type = "warning"', () => {
      const props = { type: 'warning' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.containsMatchingElement(<h4>Warning!</h4>), true);
    });
    it('should render the correct title with type = "danger"', () => {
      const props = { type: 'danger' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.containsMatchingElement(<h4>Error!</h4>), true);
    });
    it('should render the correct title with type = "info"', () => {
      const props = { type: 'info' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.containsMatchingElement(<h4>Info!</h4>), true);
    });
    // show a paragraph for the message
    it('should have a paragraph for the message with the type = "success"', () => {
      const wrapper = shallow(<AlertDismissable type="success" >children</AlertDismissable>);
      assert.equal(wrapper.html().search('<p') !== -1, true);
    });
    it('should have a paragraph for the message with the type = "warning"', () => {
      const wrapper = shallow(<AlertDismissable type="warning" >children</AlertDismissable>);
      assert.equal(wrapper.html().search('<p') !== -1, true);
    });
    it('should have a paragraph for the message with the type = "danger"', () => {
      const wrapper = shallow(<AlertDismissable type="danger" >children</AlertDismissable>);
      assert.equal(wrapper.html().search('<p') !== -1, true);
    });
    it('should have a paragraph for the message with the type = "info"', () => {
      const wrapper = shallow(<AlertDismissable type="success" >children</AlertDismissable>);
      assert.equal(wrapper.html().search('<p') !== -1, true);
    });
  /* TODO test cambio di stato premendo X
    it('should dismiss the alert with the type = "danger"', () => {
      const wrapper = shallow(<AlertDismissable type="danger" >children</AlertDismissable>);
      const button = wrapper.html().search('<button');
      console.log(wrapper.state('show'));
      ReactTestUtils.Simulate.click(button);
      assert.equal(wrapper.state('show') === false, true);
    });
    */
  });
});
