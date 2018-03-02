import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import ImageLabel from '../../../src/components/label/ImageLabel';

// unit tests for the App component
describe('ImageLabel component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = { text: '', alt: '', image: '' };
      const wrapper = shallow(<ImageLabel {...props} />);
      assert.equal(wrapper.length, 1);
    });
    it('should render the right text as paragraph', () => {
      const props = { text: 'right text', alt: '', image: '' };
      const wrapper = shallow(<ImageLabel {...props} />);
      assert.equal(wrapper.containsMatchingElement(<p>right text</p>), true);
    });
    it('should render the right image', () => {
      const props = { text: '', alt: '', image: 'right image.jpg' };
      const wrapper = shallow(<ImageLabel {...props} />);
      assert.equal(wrapper.containsMatchingElement(<img src="right image.jpg" alt="" />), true);
    });
    it('should render the right alt for the image', () => {
      const props = { text: '', alt: 'right alt', image: '' };
      const wrapper = shallow(<ImageLabel {...props} />);
      assert.equal(wrapper.containsMatchingElement(<img src="" alt="right alt" />), true);
    });
    it('should render the right text, image and alt together', () => {
      const props = { text: 'text', alt: 'alt', image: 'image' };
      const wrapper = shallow(<ImageLabel {...props} />);
      assert.equal(wrapper.containsMatchingElement(<p>text</p>), true);
      assert.equal(wrapper.containsMatchingElement(<img src="image" alt="alt" />), true);
    });
  });
});
