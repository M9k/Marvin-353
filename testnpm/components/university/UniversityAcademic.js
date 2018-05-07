

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import configureStore from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import { UniversityAcademic } from '../../../src/components/university/UniversityAcademic';


describe('UniversityYear component', () => {
  const initialState = {
    loading: false,
    errored: false,
    accademicYears: [],
  };

  const addedYears = [
    2019,
    2020,
  ];
  const item = '2020';
  const mockStore = configureStore();
  let wrapper;
  let store;
  let deletedYear;
  let addedYear;

  function setDelete(e) {
    deletedYear = e;
  }

  function setAdd(e) {
    addedYear = e;
  }

  beforeEach(() => {
    deletedYear = '';
    addedYear = '';
    store = mockStore(initialState);
    wrapper = shallow( // eslint-disable-line function-paren-newline
      <UniversityAcademic
        addYear={setAdd}
        getYears={e => e}
        deleteYears={setDelete}
        academicYears={addedYears}
        store={store}
      />);
  });


  it('Should show the form and table correctly with state', () => {
    expect(wrapper.find('div').children()).to.have.length(4);
    expect(wrapper.state().delete).to.equal(false);
    expect(wrapper.state().viewErrorMessage).to.equal(false);
  });

  it('Should viewDelete set right the state', () => {
    wrapper.instance().viewDelete(item);
    expect(wrapper.state().item).to.equal(item);
    expect(wrapper.state().delete).to.equal(true);
  });

  it('Should close modal and reset state', () => {
    wrapper.instance().notDelete();
    expect(wrapper.state().item).to.equal('');
    expect(wrapper.state().delete).to.equal(false);
  });

  it('Should close modal and reset state not deleting store', () => {
    expect(deletedYear).to.equal('');
    wrapper.instance().closeDelete({ item: { year: '2020' } });
    expect(wrapper.state().item).to.equal('');
    expect(wrapper.state().delete).to.equal(false);
    expect(deletedYear).to.equal('2020');
  });

  it('Should validate false the year submitted from the form', () => {
    wrapper.instance().validateYear({ year: { value: 2019 } });
    expect(wrapper.state().viewErrorMessage).to.equal(true);
    expect(addedYear).to.equal('');
    wrapper.instance().validateYear({ year: { value: 2020 } });
    expect(wrapper.state().viewErrorMessage).to.equal(true);
    expect(addedYear).to.equal('');
  });

  it('Should validate true the year submitted from the form', () => {
    wrapper.instance().validateYear({ year: { value: 2018 } });
    expect(wrapper.state().viewErrorMessage).to.equal(false);
    expect(addedYear).to.equal(2018);
  });

  it('Should close error message', () => {
    wrapper.instance().setState({ viewErrorMessage: true });
    expect(wrapper.state().viewErrorMessage).to.equal(true);
    wrapper.instance().closeErrorMessage();
    expect(wrapper.state().viewErrorMessage).to.equal(false);
  });
});
