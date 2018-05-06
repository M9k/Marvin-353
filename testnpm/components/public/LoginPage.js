import React from 'react';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import { shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
import { LoginPage } from '../../../src/components/public/LoginPage';
import RedirectToHome from '../../../src/components/public/RedirectToHome';

describe('AdminExams component', () => {
  const initialState = {};
  const mockStore = configureStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('Should render the component with loginLoading', () => {
    const wrapper = shallow(<LoginPage loginLoading store={store} />);
    assert.equal(wrapper.length, 1);
    assert.equal(wrapper.html().search('<div') !== -1, true);
  });
  it('Should render the component with loginFailed', () => {
    const wrapper = shallow(<LoginPage loginFailed store={store} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(RedirectToHome)).to.have.length(1);
  });
  it('Should render the component with role = 0', () => {
    const props = { role: 0 };
    const wrapper = shallow(<LoginPage {...props} store={store} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(RedirectToHome)).to.have.length(1);
  });
  it('Should render the component with role = 13', () => {
    const props = { role: 13 };
    const wrapper = shallow(<LoginPage {...props} store={store} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(RedirectToHome)).to.have.length(1);
  });
  it('Should render the component with role = 14', () => {
    const props = { role: 13 };
    const wrapper = shallow(<LoginPage {...props} store={store} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(RedirectToHome)).to.have.length(1);
  });
  it('Should render the component with role = 1', () => {
    const props = { role: 1 };
    const wrapper = shallow(<LoginPage {...props} store={store} />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(RedirectToHome)).to.have.length(1);
  });
  it('Should render the component', () => {
    const props = { role: null };
    const wrapper = shallow(<LoginPage {...props} store={store} />);
    assert.equal(wrapper.length, 1);
    assert.equal(wrapper.html().search('<div') !== -1, true);
  });
});
