import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import configureStore from 'redux-mock-store';
import License from '../../src/components/License';

// unit tests for the Home component
describe('License component', () => {
  const mockStore = configureStore();
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<License store={mockStore({ user: { role: 0 } })} />);
      assert.equal(wrapper.length, 1);
    });
    it('should display the MIT License', () => {
      const wrapper = shallow(<License store={mockStore({ user: { role: 0 } })} />);
      const licenseName = 'MIT License';
      assert.equal(wrapper.dive().text().indexOf(licenseName) > -1, true);
    });
  });
});
