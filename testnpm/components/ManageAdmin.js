import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import ManageAdmin from '../../src/components/ManageAdmin'
import AdminEmployerContainer from '../../src/containers/AdminEmployerContainer'
import AdminOverviewContainer from '../../src/containers/AdminOverviewContainer'
import Header from '../../src/components/global/Header'


chai.use(chaiEnzyme());
const expect = chai.expect;
configure({ adapter: new Adapter() });
let wrapper;
describe('ManageAdmin component', () =>{
  beforeEach(() => {
    wrapper = shallow(<ManageAdmin />);
  });
  it('should render the correct components', () => {
   expect(wrapper).to.contain([
     <h1 className="title">Manage admins</h1>,
     <AdminEmployerContainer />,
     <AdminOverviewContainer />,
   ]);
   expect(wrapper.find(Header)).to.be.present();
   expect(wrapper.children()).to.have.length(4);
  });
  it('should have the correct id', () => {
    expect(wrapper).to.have.id('ManageAdmin');
  });
});
