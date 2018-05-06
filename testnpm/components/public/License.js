import React from 'react';
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import License from '../../../src/components/public/License';

describe('Help component', () => {
  it('Should render the component', () => {
    const wrapper = shallow(<License />);
    assert.equal(wrapper.length, 1);
    assert.equal(wrapper.html().search('<h1') !== -1, true);
  });
});

