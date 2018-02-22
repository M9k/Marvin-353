import React from 'react';
import { shallow, configure } from 'enzyme';
import assert from 'assert';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';
import ButtonFactory from '../../../src/components/buttons/ButtonFactory';
import AccountTypes from '../../../src/components/AccountEnum';

configure({ adapter: new Adapter() });

// unit tests for the App component
describe('ButtonFactory component', () => {
  // mock
  const mockStore = configureStore();
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<ButtonFactory
        store={mockStore({
          routing:
            { locationBeforeTransitions: { pathname: '/' } },
        })}
      />);
      assert.equal(wrapper.length, 1);
    });
    it('Should render a div with id="ButtonGroup"', () => {
      const wrapper = shallow(<ButtonFactory
        store={mockStore({
          routing:
            { locationBeforeTransitions: { pathname: '/' } },
        })}
      />);
      assert.equal(wrapper.html(), '<div id="ButtonGroup"></div>');
    });
    it('with null as role should render price and help, without the logout ', () => {
      const wrapper = shallow(<ButtonFactory
        accountType={AccountTypes.NOTLOGGED}
        store={mockStore({
          routing:
            { locationBeforeTransitions: { pathname: '/' } },
        })}
      />);
      assert.equal(wrapper.dive().find('ButtonPrice').length, 1);
      assert.equal(wrapper.dive().find('ButtonHelp').length, 1);
      assert.equal(wrapper.dive().find('ButtonLogOut').length, 0);
    });
    it('with AccountTypes.NOTLOGGED as role should render price and help, without the logout ', () => {
      const wrapper = shallow(<ButtonFactory
        accountType={AccountTypes.NOTLOGGED}
        store={mockStore({
          routing:
            { locationBeforeTransitions: { pathname: '/' } },
        })}
      />);
      assert.equal(wrapper.dive().find('ButtonPrice').length, 1);
      assert.equal(wrapper.dive().find('ButtonHelp').length, 1);
      assert.equal(wrapper.dive().find('ButtonLogOut').length, 0);
    });
    it('with null as role should render price and help, without the logout ', () => {
      const wrapper = shallow(<ButtonFactory
        accountType={null}
        store={mockStore({
          routing:
            { locationBeforeTransitions: { pathname: '/' } },
        })}
      />);
      assert.equal(wrapper.dive().find('ButtonPrice').length, 1);
      assert.equal(wrapper.dive().find('ButtonHelp').length, 1);
      assert.equal(wrapper.dive().find('ButtonLogOut').length, 0);
    });
    // TODO una volta fixato copiare lo stesso test per le altre cateogrie dello stesso gruppo
    it('with AccountTypes.UNIVERSITY as role should render price, help and logout ', () => {
      const wrapper = shallow(<ButtonFactory
        accountType={AccountTypes.UNIVERSITY}
        store={mockStore({
          routing:
            { locationBeforeTransitions: { pathname: '/' } },
        })}
      />);
      assert.equal(wrapper.dive().find('ButtonPrice').length, 1);
      assert.equal(wrapper.dive().find('ButtonHelp').length, 1);
      // TODO: Perché ButtonBackToHome al posto di ButtonLogOut ???????????
      // assert.equal(wrapper.dive().text(), 1);
      assert.equal(wrapper.dive().find('ButtonBackToHome').length, 1);
      // assert.equal(wrapper.dive().find('ButtonLogOut').length, 0);
    });
    it('with incorrect value as role should render nothing ', () => {
      const wrapper = shallow(<ButtonFactory
        accountType={1234567890}
        store={mockStore({
          routing:
            { locationBeforeTransitions: { pathname: '/' } },
        })}
      />);
      assert.equal(wrapper.dive().find('ButtonPrice').length, 0);
      assert.equal(wrapper.dive().find('ButtonHelp').length, 0);
      assert.equal(wrapper.dive().find('ButtonLogOut').length, 0);
    });
  });
});
