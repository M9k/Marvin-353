import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import configureStore from 'redux-mock-store';
import Help from '../../src/components/Help';

// unit tests for the Help page component
describe('Help page component', () => {
  const mockStore = configureStore();
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<Help
        store={mockStore({ user: { role: 0 } })}
      />);
      assert.equal(wrapper.length, 1);
    });
    it('should has title Help', () => {
      const wrapper = shallow(<Help
        store={mockStore({ user: { role: 0 } })}
      />);
      assert.equal(wrapper.dive().contains(<h1 className="title">Help</h1>), true);
    });
  });
});
