import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import Button from '../../../src/components/buttons/Button';

// unit tests for the App component
describe('App component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = { link: '' };
      const wrapper = shallow(<Button {...props} >children</Button>);
      assert.equal(wrapper.length, 1);
    });
    it('should render the correct link inside an a element', () => {
      const props = { link: 'correct link', children: '' };
      const wrapper = shallow(<Button {...props} >children</Button>);
      assert.equal(wrapper.containsMatchingElement(<a href="correct link">children</a>), true);
    });
    it('should render the correct children', () => {
      const props = { link: 'correct link', children: '' };
      const wrapper = shallow(<Button {...props} >children</Button>);
      assert.equal(wrapper.html().search('children') !== -1, true);
    });
  });
});
