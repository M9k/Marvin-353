import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import Header from '../../../src/components/global/Header';

// unit tests for the App component
describe('Header component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = { welcome: '' };
      const wrapper = shallow(<Header {...props} >Children</Header>);
      assert.equal(wrapper.length, 1);
    });
    /*
    it('should send the welcome text to WelcomeLabel', () => {
      const props = { welcome: 'The right welcome text' };
      const wrapper = shallow(<Header {...props} >Children</Header>);
      TODO aggiustare, problema con lo store
      assert.equal(
        wrapper.html().search(<div id="WelcomeLabel">The right welcome text</div>) !== -1,
        true
      );
    });
    */
  });
});
