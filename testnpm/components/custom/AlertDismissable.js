import React from 'react';
import { shallow, render } from 'enzyme';
import assert from 'assert';
import AlertDismissable from '../../../src/components/custom/AlertDismissable';
import {expect} from "chai";

describe('Alert dismissable component', () => {
  it('Should render the success component', () => {
    const wrapper = shallow(<AlertDismissable message="test" type="success" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find('h4').text()).to.equal('Success!');
    expect(wrapper.find('p').text()).to.equal('test');
  });
  it('Should render the danger component', () => {
    const wrapper = shallow(<AlertDismissable message="test" type="danger" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find('h4').text()).to.equal('Error!');
    expect(wrapper.find('p').text()).to.equal('test');
  });
  it('Should render the warning component', () => {
    const wrapper = shallow(<AlertDismissable message="test" type="warning" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find('h4').text()).to.equal('Warning!');
    expect(wrapper.find('p').text()).to.equal('test');
  });
  it('Should render the info component', () => {
    const wrapper = shallow(<AlertDismissable message="test" type="info" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find('h4').text()).to.equal('Info!');
    expect(wrapper.find('p').text()).to.equal('test');
  });
});

