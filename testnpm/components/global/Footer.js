import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import Footer from '../../../src/components/global/Footer';

// unit tests for the App component
describe('Footer component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<Footer />);
      assert.equal(wrapper.length, 1);
    });
    it('should create a children with "footer" as id', () => {
      const wrapper = shallow(<Footer />);
      assert.equal(wrapper.html().search('id="footer"') !== -1, true);
    });
    it('should link the license page', () => {
      const wrapper = shallow(<Footer />);
      assert.equal(wrapper.html().search('href="/license"') !== -1, 1);
    });
  });
});
