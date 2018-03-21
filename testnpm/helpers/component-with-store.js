/**
 * This helper make really fast the costruction of components
 * with a mocked store inside them
 * The *WithStore methods return a desidered enzyme component with a store inside them,
 * The first param is the istance of a component you'd like to mock and the second one
 * can ether be a plain object (that would be converted in a mock of a store) or the object
 * returned by the createMockStore by redux-test-utils (useful if you need the reference of that object
 */

import { shallow, mount, render } from 'enzyme';
import { createMockStore } from 'redux-test-utils';

require('jsdom-global')();
const isPlain = (obj) => (
  obj.getState === undefined || obj.getState === null
);
const shallowWithStore = (component, store) => {
  if(isPlain(store)) store = createMockStore(store);
  const context = {
    store,
  };
  return shallow(component, { context });
};
const mountWithStore = (component, store) => {
  if(isPlain(store)) store = createMockStore(store);
  const context = {
    store,
  };
  return mount(component, { context });
};
const renderWithStore = (component, store) => {
  if(isPlain(store)) store = createMockStore(store);
  const context = {
    store,
  };
  return render(component, { context });
};
export { shallowWithStore, mountWithStore, renderWithStore, createMockStore };
