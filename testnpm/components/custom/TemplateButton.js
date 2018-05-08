import React from 'react';
import { mount, shallow } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import assert from 'assert';
import { expect } from 'chai'; // eslint-disable-line import/no-extraneous-dependencies
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
  it('Should call handleClick()', () => {
    const wrapper = mount(<TemplateButton
      clickFunction={e => e}
      objectToWorkOn="test"
      text="Text"
      type="danger"
    />);
    wrapper.instance().handleClick();
  });
});
