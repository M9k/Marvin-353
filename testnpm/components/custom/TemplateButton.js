import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import { expect } from 'chai';
import { Button } from 'react-bootstrap';
import TemplateButton from '../../../src/components/custom/TemplateButton';


describe('TemplateButton component', () => {
  it('Should render the component', () => {
    const wrapper = shallow(<TemplateButton clickFunction={e => e} objectToWorkOn="test" text="Text" type="danger" />);
    assert.equal(wrapper.length, 1);
    expect(wrapper.find(Button)).to.have.length(1);
  });

  it('should save correct props', () => {
    const wrapper = mount(<TemplateButton
      clickFunction={e => e}
      objectToWorkOn="test"
      text="Text"
      type="danger"
    />);
    expect(wrapper.props().objectToWorkOn).to.equal('test');
    expect(wrapper.props().text).to.equal('Text');
    expect(wrapper.props().type).to.equal('danger');
    expect(wrapper.props().clickFunction('returnTestF')).to.equal('returnTestF');
  });
});
