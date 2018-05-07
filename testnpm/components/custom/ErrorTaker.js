import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import assert from 'assert';
import ErrorTaker from '../../../src/components/custom/ErrorTaker';

describe('Error taker component', () => {

  it('renders', () => {
    const wrapper = shallow(<ErrorTaker><div>test</div></ErrorTaker>);
    expect(wrapper).to.have.length(1);
  });
  it('should render the error', () => {
    const wrapper = shallow(<ErrorTaker>test</ErrorTaker>);
    wrapper.setState({ hasError: true });
    expect(wrapper.find('h3').text()).to.equal('Sorry, something went wrong somewhere');
    expect(wrapper.find('p').text()).to.equal('We are working to solve this issue.');
  });
});
