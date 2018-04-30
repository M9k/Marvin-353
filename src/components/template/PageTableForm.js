import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import TemplateButton from '../custom/TemplateButton';
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
    this.getConfirmationButton = this.getConfirmationButton.bind(this);
    this.getRows = this.getRows.bind(this);
    this.getRow = this.getRow.bind(this);
  }

  componentWillMount() {
    this.refreshData();
  }

  getEditButton(item) {
    if (this.props.editTableData !== undefined) {
      return (
        <td><Button onClick={this.props.editTableData(item)}>Edit button</Button></td>
      );
    }
    return null;
  }

  getDetailsButton(item) {
    if (this.props.linkTableData) {
      let path = document.location.pathname;
      path = path.concat(`/${item.name}_${item.solarYear}`);
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
        <td>
          <TemplateButton
            deleteFunction={this.props.deleteSingleColumnRow}
            objectToRemove={item}
            text="Delete"
            type="danger"
          />
        </td>
      );
    }
    return null;
  }
  getMultiColumnDeleteButton(item) {
    if (this.props.deleteMultiColumnRow !== undefined) {
      console.log('Stampa del item', item);
      return (
        <td>
          <TemplateButton
            deleteFunction={this.props.deleteMultiColumnRow}
            objectToRemove={item}
            text={this.props.headerInfo[this.props.headerInfo.length - 1]}
            type="danger"
          />
        </td>
      );
    }
    return null;
  }
  getConfirmationButton(item) {
    if (this.props.confirmationFunction !== undefined) {
      return (
        <td>
          <TemplateButton
            deleteFunction={this.props.confirmationFunction}
            objectToRemove={item}
            text="Confirm"
            type="primary"
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
          {this.getConfirmationButton(item)}
          {this.getEditButton(item)}
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

  refreshData() {
    this.props.getTableData(); // ask redux the table data array
  }

  render() {
    const tableHead = this.props.headerInfo.map(item =>
      <th key={Utils.generateKey(item)}>{item}</th>);
    return (
      <div>
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
  deleteMultiColumnRow: PropTypes.func,
  confirmationFunction: PropTypes.func,
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
  confirmationFunction: undefined,
  linkTableData: false,
  detailTableData: false,
  columFilter: false,
};

export default PageTableForm;
