import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import Form from '../custom/form';
import DeleteButton from '../custom/deleteButton';

export default class PageTableForm extends React.Component {
  constructor(props) {
    super(props);
    this.getTableData = props.getTableData.bind(this);
    this.deleteTableData = props.deleteTableData.bind(this);
    this.editTableData = props.editTableData.bind(this);
    this.addTableData = props.addTableData.bind(this);
    this.state = {
      dataArray: this.getTableData(),
    };
  }
  getButtons() {
    if (this.deleteTableData() !== -1){
      return (<td><DeleteButton /></td>);
    }
    if (this.editTableData() !== -1) {
      return (<td>Edit button</td>);
    }
    return null;
  }
  isFormRequired(){
    if (this.addTableData() !== -1) {
      return <Form />;
    }
    return null;
  }
  render() {
    return (
      <div>
        {this.isFormRequired()}
        <Table striped bordered condensed hover>
          <tbody>
            {this.state.dataArray.map(item => <tr><td>{item}</td> {this.getButtons()}</tr>)}
          </tbody>
        </Table>
      </div>
    );
  }
}

PageTableForm.propType = {
  getTableData: PropTypes.func.isRequired,
  editTableData: PropTypes.func,
  deleteTableData: PropTypes.func,
  addTableData: PropTypes.func,
};

PageTableForm.defaultProps = {
  getTableData: () => -1,
  editTableData: () => -1,
  deleteTableData: () => -1,
  addTableData: () => -1,
};
