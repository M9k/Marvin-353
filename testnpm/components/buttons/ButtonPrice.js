import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import configureStore from 'redux-mock-store';
import ButtonPrice from '../../../src/components/buttons/ButtonPrice';


// unit tests for the App component
describe('ButtonPrice component', () => {
  //mock
  const Button = props => (<div>{props.link} {props.children}</div>);
  const mockStore = configureStore();
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<ButtonPrice
        store={mockStore({
          routing:
            { locationBeforeTransitions: { pathname: '' } },
        })}
      />);
      assert.equal(wrapper.length, 1);
    });
    it('should indicate the price page if the path isn\'t /price', () => {
      const wrapper = shallow(<ButtonPrice
        store={mockStore({
          routing:
            { locationBeforeTransitions: { pathname: '' } },
        })}
      />);
      assert.equal(wrapper.html().search('/price') !== -1, true);
    });
    it('should NOT indicate the price page if the path is /price', () => {
      const wrapper = shallow(<ButtonPrice
        store={mockStore({
          routing:
            { locationBeforeTransitions: { pathname: '/price' } },
        })}
      />);
      assert.equal(wrapper.html().search('/price') !== -1, false);
    });
    it('should have "Price" as text', () => {
      const wrapper = shallow(<ButtonPrice
        store={mockStore({
          routing:
            { locationBeforeTransitions: { pathname: '' } },
        })}
      />);
      assert.equal(wrapper.html().search('Price') !== -1, true);
    });
    it('should be a span if the path is "/price"', () => {
      const wrapper = shallow(<ButtonPrice
        store={mockStore({
          routing:
            { locationBeforeTransitions: { pathname: '/price' } },
        })}
      />);
      assert.equal(wrapper.html().search('<span') !== -1, true);
    });
  });
});
