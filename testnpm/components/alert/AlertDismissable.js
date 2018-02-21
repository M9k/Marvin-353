import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import AlertDismissable from '../../../src/components/alert/AlertDismissable';

// unit tests for the App component
describe('AlertDismissable component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = { type: 'danger' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.length, 1);
    });
    it('should render the correct children', () => {
      const props = { type: 'danger', children: '' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.html().search('children') !== -1, true);
    });
    it('should render the correct title', () => {
      const props = { type: 'danger', children: '' };
      const wrapper = shallow(<AlertDismissable {...props} >children</AlertDismissable>);
      assert.equal(wrapper.html().search('<h4') !== -1, true);
    });
  });
});
