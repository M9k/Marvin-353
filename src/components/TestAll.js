import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Panel from 'react-bootstrap/lib/Panel';
import Radio from 'react-bootstrap/lib/Radio';
import Table from 'react-bootstrap/lib/Table';
import Pager from 'react-bootstrap/lib/Pager';

function TestAll() {
  return (
    <div>
      <PageHeader>
        Example page header <small>Subtext for header</small>
      </PageHeader>
      <Panel>
        <FormGroup
          controlId="formBasicText"
        >
          <ControlLabel>Working example with validation</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter text"
          />
          <FormControl.Feedback />
        </FormGroup>

        <form>
          <Checkbox checked readOnly>
            Checkbox
          </Checkbox>
          <Radio checked readOnly>
            Radio
          </Radio>

          <FormGroup>
            <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>{' '}
            <Checkbox inline>3</Checkbox>
          </FormGroup>
          <FormGroup>
            <Radio name="radioGroup" inline>
              1
            </Radio>{' '}
            <Radio name="radioGroup" inline>
              2
            </Radio>{' '}
            <Radio name="radioGroup" inline>
              3
            </Radio>
          </FormGroup>

          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select</ControlLabel>
            <FormControl componentClass="select" placeholder="select">
              <option value="select">select me </option>
              <option value="select">select or me</option>
              <option value="select">or just me</option>
              <option value="other">...</option>
            </FormControl>
          </FormGroup>

          <Button type="submit">Submit</Button>
        </form>
      </Panel>
      <Panel>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td><Button bsStyle="primary">See exams</Button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td><Button bsStyle="primary">Add grade</Button></td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td><Button bsStyle="primary">See exams</Button></td>
            </tr>
          </tbody>
        </Table>
        <Pager>
          <Pager.Item href="#">Previous</Pager.Item>{' '}
          <Pager.Item href="#">Next</Pager.Item>
        </Pager>
      </Panel>
    </div>);
}

export default TestAll;

