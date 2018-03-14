import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import configureStore from 'redux-mock-store';
import Price from '../../src/components/Price';

// unit tests for the Price page component
describe('Price page component', () => {
  const mockStore = configureStore();
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<Price
        store={mockStore({ user: { role: 0 } })}
      />);
      assert.equal(wrapper.length, 1);
    });
    // TODO - altri test
  });
});
