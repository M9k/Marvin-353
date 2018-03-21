import { shallow, mount, render } from 'enzyme'
import { createMockStore } from 'redux-test-utils';

require('jsdom-global')();

const shallowWithStore = (component, store) => {
  store = createMockStore(store);
  const context = {
    store,
  };
  return shallow(component, { context });
};
const mountWithStore = (component, store) => {
  store = createMockStore(store);
  const context = {
    store,
  };
  return mount(component, { context });
};
const renderWithStore = (component, store) => {
  store = createMockStore(store);
  const context = {
    store,
  };
  return render(component, { context });
};
export { shallowWithStore, mountWithStore, renderWithStore };
