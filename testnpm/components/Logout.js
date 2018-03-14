import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import Logout from '../../src/components/Logout';

// unit tests for the Logout page component
describe('Logout page component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<Logout />);
      assert.equal(wrapper.length, 1);
    });
    it('should has title Logout', () => {
      const wrapper = shallow(<Logout />);
      assert.equal(wrapper.contains(<h1 className="title">Logout</h1>), true);
    });
  });
});
