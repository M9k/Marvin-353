import React from 'react';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { Index } from '../../../src/components/public/Index';
import CardWithIcon from '../../../src/components/custom/CardWithIcon';
import AlertDismissable from '../../../src/components/custom/AlertDismissable';

describe('Index component', () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('Should render the component', () => {
    const wrapper = shallow(<Index store={store} />);
    assert.equal(wrapper.length, 1);
    assert.equal(wrapper.html().search('<h3') !== -1, true);
    assert.equal(wrapper.html().search('<img') !== -1, true);
    expect(wrapper.find(CardWithIcon)).to.have.length(2);
  });
  it('Should render a error message if metamask is not install', () => {
    const wrapper = shallow(<Index store={store} metamask={false} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(AlertDismissable)).to.have.length(2);
  });
  it('Should render a error message if metamask is locked', () => {
    const wrapper = shallow(<Index store={store} metamask account="" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(AlertDismissable)).to.have.length(1);
  });
});

