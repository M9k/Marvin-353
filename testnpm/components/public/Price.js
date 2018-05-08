import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import Price from '../../../src/components/public/Price';

describe('Price component', () => {
  it('Should render the component', () => {
    const wrapper = shallow(<Price />);
    assert.equal(wrapper.length, 1);
  });
  it('Should have the correct initial state', () => {
    const wrapper = shallow(<Price />);
    expect(wrapper.state().eth).to.equal('');
    expect(wrapper.state().ethGas).to.equal('');
  });
  it('Should call componentDidMount()', () => {
    const wrapper = shallow(<Price />);
    wrapper.instance().componentDidMount();
  });
});

