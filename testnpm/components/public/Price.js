import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import Price from '../../../src/components/public/Price';

describe('Price component', () => {
  it('Should render the component', () => {
    const wrapper = shallow(<Price />);
    assert.equal(wrapper.length, 1);
  });
});

