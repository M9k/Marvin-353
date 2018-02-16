import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import ImageLabel from '../../../src/components/label/ImageLabel';

// unit tests for the App component
describe('App component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = { text: '', alt: '', image: '' };
      const wrapper = shallow(<ImageLabel {...props} />);
      assert.equal(wrapper.length, 1);
    });
  });
});
