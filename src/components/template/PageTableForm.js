import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import Form from '../custom/Form';
import DeleteButton from '../custom/deleteButton';
import Utils from '../custom/utils';


class PageTableForm extends React.Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.getDeleteButtons = this.getDeleteButtons.bind(this);
    this.isFormRequired = this.isFormRequired.bind(this);
    this.getRows = this.getRows.bind(this);
  }

  componentWillMount() {
    this.refreshData();
  }

  getDeleteButtons(item) {
    return (
      <td><DeleteButton deleteFunction={this.props.deleteTableData} objectToRemove={item} /></td>
    );
    /*
    if (this.props.editTableData() !== -1) {
      return (<td><Button onClick={this.props.editTableData}>Edit button</Button></td>);
    }
    */
  }

  getRows() {
    if (this.props.tableType === 1) {
      const tableRows = this.props.tableData.map(item =>
        <tr key={Utils.generateKey(item)}><td>{item}</td>{this.getDeleteButtons(item)}</tr>);
      return tableRows;
    }
    return (<tr></tr>);
  }

  isFormRequired() {
    if (this.props.addTableData() !== -1) {
      return <Form submitFunction={this.props.getTableData} />;
    }
    return null;
  }

  refreshData() {
    this.props.getTableData(); // ask redux the table data array
  }

  render() {
    const tableHead = this.props.headerInfo.map(item =>
      <th key={Utils.generateKey(item)}>{item}</th>);
    return (
      <div>
        {this.isFormRequired()}
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              {tableHead}
            </tr>
          </thead>
          <tbody>
            {this.getRows()}
          </tbody>
        </Table>
      </div>
    );
  }
}

PageTableForm.propTypes = {
  getTableData: PropTypes.func.isRequired,
  editTableData: PropTypes.func,
  deleteTableData: PropTypes.func,
  addTableData: PropTypes.func,
  tableData: PropTypes.arrayOf(String).isRequired,
  headerInfo: PropTypes.arrayOf(String).isRequired,
  tableType: PropTypes.number.isRequired,
};

PageTableForm.defaultProps = {
  editTableData: () => -1,
  deleteTableData: () => -1,
  addTableData: () => -1,
};

export default PageTableForm;
