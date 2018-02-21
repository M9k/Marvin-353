import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import configureStore from 'redux-mock-store';
import ButtonFactory from '../../../src/components/buttons/ButtonFactory';
import AccountTypes from '../../../src/components/AccountEnum';

// unit tests for the App component
describe('ButtonFactory component', () => {
  // mock
  const mockStore = configureStore();
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<ButtonFactory
        store={mockStore({
          user:
            { role: 0 },
        })}
      />);
      assert.equal(wrapper.length, 1);
    });
    it('without a correct role should render a empty ButtonFactory', () => {
      const wrapper = shallow(<ButtonFactory
        store={mockStore({
          user:
            { role: 123456789 },
        })}
      />);
      assert.equal(wrapper.html(), '<div id="ButtonGroup"></div>');
    });
    it('with AccountTypes.NOTLOGGED as role should render price and help ', () => {
      const wrapper = shallow(<ButtonFactory
        accountType={AccountTypes.NOTLOGGED}
        store={mockStore({
          user:
            { role: AccountTypes.NOTLOGGED },
        })}
      />);
      // TODO: come?
      // assert.equal(wrapper.contains('div'), true);
    });
  });
});
