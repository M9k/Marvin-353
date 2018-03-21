import React from 'react';
import AdminEmployerContainer, { AdminEmployerComponent } from '../../src/containers/AdminEmployerContainer';
import { universityAction } from '../../src/actions/actions';
import FormAddAdmin from '../../src/components/form/FormAddAdmin';
import { shallowWithStore, createMockStore } from '../helpers/component-with-store';
import { expect } from '../helpers/chai-enzyme';

describe('<AdminEmplyoerCointainer/>', () => {
  it('should render correctly', () => {
    const wrapper = shallowWithStore(<AdminEmployerComponent />, {});
    expect(wrapper).to.have.exactly(1).descendants('h2');
    expect(wrapper).to.have.exactly(1).descendants(FormAddAdmin);
    expect(wrapper.find('div').first()).to.have.id('admin-employer');
  });
  it('should dispatch the correct actions', () => {
    const store = createMockStore({});
    const wrapper = shallowWithStore(<AdminEmployerContainer />, store);
    wrapper.props().addAdmin('pippo');
    expect(store.isActionDispatched({
      type: universityAction.ADD_NEW_ADMIN,
      address: 'pippo',
    })).to.be.true;
    expect(store.isActionDispatched({
      type: universityAction.ADD_NEW_ADMIN,
      address: 'pippoooooo',
    })).to.be.false;
    expect(store.isActionTypeDispatched(universityAction.REMOVE_ADMIN)).to.be.false;
    expect(store.isActionTypeDispatched(universityAction.ADD_NEW_ADMIN)).to.be.true;
  });
});
