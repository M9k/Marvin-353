import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import Form from '../custom/Form';
import DeleteButton from '../custom/DeleteButton';
import Utils from '../custom/utils';


class PageTableForm extends React.Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.getEditButton = this.getEditButton.bind(this);
    this.getDeleteButton = this.getDeleteButton.bind(this);
    this.isFormRequired = this.isFormRequired.bind(this);
    this.getRows = this.getRows.bind(this);
  }

  componentWillMount() {
    this.refreshData();
  }

  getEditButton() {
    if (this.props.editTableData !== undefined) {
      return (
        <Button onClick={this.props.editTableData}>Edit button</Button>
      );
    }
    return null;
  }

  getDeleteButton(item) {
    if (this.props.deleteTableData !== undefined) {
      return (
        <DeleteButton deleteFunction={this.props.deleteTableData} objectToRemove={item} />
      );
    }
    return null;
  }

  getRows() {
    return this.props.tableData.map(item =>
      (
        <tr key={Utils.generateKey(item)}>
          <td>{item}</td>
          <td>
            {this.getEditButton()}
            {this.getDeleteButton({ item })}
          </td>
        </tr>
      ));
  }

  isFormRequired() {
    if (this.props.addTableData !== undefined) {
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
              <th />
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
};

PageTableForm.defaultProps = {
  editTableData: undefined,
  deleteTableData: undefined,
  addTableData: undefined,
};

export default PageTableForm;
