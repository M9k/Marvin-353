import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import WelcomeLabel from '../../../src/components/label/WelcomeLabel';


// unit tests for the App component
describe('WelcomeLabel component', () => {
  // mock
  // const ImageLabel = props => (<div>{props.alt} {props.text} {props.image}</div>);
  describe('render()', () => {
    it('should render the component', () => {
      const props = { text: '' };
      const wrapper = shallow(<WelcomeLabel {...props} />);
      assert.equal(wrapper.length, 1);
    });
    it('should use the correct logo', () => {
      const props = { text: '' };
      const wrapper = shallow(<WelcomeLabel {...props} />);
      assert.equal(wrapper.html().search('media/logo.png') !== -1, true);
    });
    it('should use the props.text', () => {
      const props = { text: 'right text' };
      const wrapper = shallow(<WelcomeLabel {...props} />);
      assert.equal(wrapper.html().search('right text') !== -1, true);
    });
    it('should use "Marvin logo"', () => {
      const props = { text: '' };
      const wrapper = shallow(<WelcomeLabel {...props} />);
      assert.equal(wrapper.html().search('Marvin logo') !== -1, true);
    });
  });
});
