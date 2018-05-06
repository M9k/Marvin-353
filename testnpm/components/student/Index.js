import React from 'react';
import { shallow } from 'enzyme/build/index';
import { expect } from 'chai';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import assert from 'assert';
import CardWithIcon from '../../../src/components/custom/CardWithIcon';

import { Index } from '../../../src/components/student/Index';

describe('Index Student', () => {
  it('Should render the index with right number of cards', () => {
    const wrapper = shallow(<Index myAddress="myAddress" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(CardWithIcon)).to.have.length(2);
  });
  /* it('Should get correct props', () => {
    const wrapper = shallow(<Index myAddress="test" />);
    expect(wrapper.prop().myAddress).to.equal('test');
  }); */
  it('Should render the correct bootsrap component', () => {
    const wrapper = shallow(<Index myAddress="myAddress" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Jumbotron)).to.have.length(1);
  });
});
