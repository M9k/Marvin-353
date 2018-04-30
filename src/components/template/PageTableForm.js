import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import Form from '../custom/Form';
import DeleteButton from '../custom/DeleteButton';
import DetailsButton from '../custom/DetailsButton';
import Utils from '../custom/utils';


class PageTableForm extends React.Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.getEditButton = this.getEditButton.bind(this);
    this.getMultiColumnDeleteButton = this.getMultiColumnDeleteButton.bind(this);
    this.getDeleteButton = this.getDeleteButton.bind(this);
    this.getDetailsButton = this.getDetailsButton.bind(this);
    this.isFormRequired = this.isFormRequired.bind(this);
    this.getRows = this.getRows.bind(this);
    this.getRow = this.getRow.bind(this);
  }

  componentWillMount() {
    this.refreshData();
  }

  getEditButton() {
    if (this.props.editTableData !== undefined) {
      return (
        <td><Button onClick={this.props.editTableData}>Edit button</Button></td>
      );
    }
    return null;
  }

  getDetailsButton(item) {
    if (this.props.linkTableData) {
      let path = document.location.pathname;
      path = path.concat(`/${item.code}_${item.solarYear}`);
      return (
        <Button href={path}>Details</Button>
      );
    }
    if (this.props.detailTableData) {
      return (
        <DetailsButton object={item} text="Details" />
      );
    }
    return null;
  }

  getDeleteButton(item) {
    if (this.props.deleteSingleColumnRow !== undefined) {
      return (
        <td><DeleteButton deleteFunction={this.props.deleteSingleColumnRow} objectToRemove={item} text="Delete" /></td>
      );
    }
    return null;
  }
  getMultiColumnDeleteButton(item) {
    if (this.props.deleteMultiColumnRow !== undefined) {
      console.log('Stampa del item', item);
      return (
        <td>
          <DeleteButton
            deleteFunction={this.props.deleteMultiColumnRow}
            objectToRemove={item}
            text={this.props.headerInfo[this.props.headerInfo.length - 1]}
          />
        </td>
      );
    }
    return null;
  }
  // eslint-disable-next-line
  getRow(item) {
    if (item instanceof Object) {
      if (this.props.columFilter) {
        return Object.keys(item).filter(key => this.props.headerInfo.includes(key)).map(key =>
          <td>{this.checkBooleanValue(item[key])}</td>);
      }
      return Object.keys(item).map(key =>
        <td>{this.checkBooleanValue(item[key])}</td>);
    }
    return <td>{this.checkBooleanValue(item)}</td>;
  }
  getRows() {
    return this.props.tableData.map(item =>
      (
        <tr key={Utils.generateKey(item)}>
          {this.getRow(item)}
          {this.getDetailsButton(item)}
          {this.getEditButton()}
          {this.getDeleteButton(item)}
          {this.getMultiColumnDeleteButton(item.Address)}
        </tr>
      ));
  }
  checkBooleanValue(item) { // eslint-disable-line class-methods-use-this
    if (item === true || item === false) {
      return item ? 'Yes' : 'No';
    }
    return item;
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
  deleteSingleColumnRow: PropTypes.func,
  addTableData: PropTypes.func,
  deleteMultiColumnRow: PropTypes.func,
  tableData: PropTypes.arrayOf(Object).isRequired,
  headerInfo: PropTypes.arrayOf(String).isRequired,
  linkTableData: PropTypes.bool,
  detailTableData: PropTypes.bool,
  columFilter: PropTypes.bool,
};

PageTableForm.defaultProps = {
  editTableData: undefined,
  deleteMultiColumnRow: undefined,
  deleteSingleColumnRow: undefined,
  addTableData: undefined,
  linkTableData: false,
  detailTableData: false,
  columFilter: false,
};

export default PageTableForm;
