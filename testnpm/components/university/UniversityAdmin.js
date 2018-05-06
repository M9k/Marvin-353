import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { UniversityAdmin } from '../../../src/components/university/UniversityAdmin';


describe('UniversityAdmin', () => {
  it('Should show the form and table correctly', () => {
    const adminArr = [
      '0xc8321642f5a2549c58b1a6f34a68ec76e2c107b9', '0xc8321642f5a2549c58b1a6f34a68ec76e2c107b1',
    ];
    let addedAdmin = 0;

    const pageCompShallow = shallow(<UniversityAdmin
      addAdmin={() => addedAdmin = 1}
      getAdmins={e => e}
      adminAccount={adminArr}
    />);

    /**
     * Admin page should have one form to add, table with list of admins
     * and an hidden modal at the end
     */
    expect(pageCompShallow.find('div').children()).to.have.length(3);

    // pageCompShallow.find('input[name="addressAdmin"]').simulate('change', {target: {value: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf'}});

    // pageCompShallow.find('form').simulate('submit');

    // expect(addedAdmin.to.equal(1));
  });
});
