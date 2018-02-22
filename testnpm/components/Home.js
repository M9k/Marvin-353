import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import configureStore from 'redux-mock-store';
import Home from '../../src/components/Home';

// unit tests for the Home component
describe('Home component', () => {
  // mock
  const mockStore = configureStore();
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<Home
        store={mockStore({
          user:
            {
              metamask: true,
              account: true,
              isLogged: true,
              accountType: true,
            },
        })}
      />);
      assert.equal(wrapper.length, 1);
    });
  });
});
