import React from 'react';
import { Button } from 'react-bootstrap';
import { expect } from '../helpers/chai-enzyme';
import { shallowWithStore, createMockStore } from '../helpers/component-with-store';
import AdminOverviewContainer, { AdminOverviewComponent } from '../../src/containers/AdminOverviewContainer';
import RemoveList from '../../src/components/lists/RemoveList';
import { universityAction } from '../../src/actions/actions';

const defaultStore = {
  university: {
    adminNumber: 1,
    adminAccount: ['pippo'],
  },
};
describe('<AdminOverviewContainer/>', () => {
  it('should render correctly', () => {
    const wrapper = shallowWithStore(<AdminOverviewComponent />, {});
    expect(wrapper).to.have.exactly(1).descendants('h2');
    expect(wrapper).to.have.exactly(1).descendants(Button);
    expect(wrapper).to.have.exactly(1).descendants('p');
    expect(wrapper).to.have.exactly(1).descendants(RemoveList);
    expect(wrapper.find('div').first()).to.have.id('admin-overview');
  });
  it('should connect right to the props', () => {
    const wrapper = shallowWithStore(<AdminOverviewContainer />, defaultStore);
    expect(wrapper.props().adminNumber).to.be.equal(1);
    expect(wrapper.props().adminAccount).to.be.an('array').that.does.include('pippo');
  });
  it('should fire the correct actions', () => {
    const store = createMockStore(defaultStore);
    const wrapper = shallowWithStore(<AdminOverviewContainer />, store);
    wrapper.props().getAdminNumber();
    wrapper.props().getAllAdmin(1);
    wrapper.props().removeAdmin('pippo');
    expect(store.isActionTypeDispatched(universityAction.GET_ADMIN_NUMBER)).to.be.true;
    expect(store.isActionDispatched({
      type: universityAction.GET_ALL_ADMINS,
      number: 1,
    })).to.be.true;
    expect(store.isActionDispatched({
      type: universityAction.REMOVE_ADMIN,
      address: 'pippo',
    })).to.be.true;
    expect(store.isActionTypeDispatched(universityAction.ADD_NEW_ADMIN)).to.be.false;
    expect(store.isActionTypeDispatched(universityAction.SET_ADMIN_NUMBER)).to.be.false;
    expect(store.isActionTypeDispatched(universityAction.SET_ADMINS_LIST)).to.be.false;
  });
});
