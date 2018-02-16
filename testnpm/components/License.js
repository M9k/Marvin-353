import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import License from '../../src/components/License';

// unit tests for the Home component
describe('License component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<License />);
      assert.equal(wrapper.length, 1);
    });
    it('should display the MIT License', () => {
      const wrapper = shallow(<License />);
      const licenseName = 'MIT License';
      assert.equal(wrapper.text().indexOf(licenseName) > 0, true);
    });
  });
});
