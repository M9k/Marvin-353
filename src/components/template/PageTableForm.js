import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';
import TemplateButton from '../custom/TemplateButton';
import DetailsButton from '../custom/DetailsButton';
import Utils from '../custom/utils';


class PageTableForm extends React.Component {
  static checkBooleanValue(item) {
    if (item === true || item === false) {
      return item ? 'Yes' : 'No';
    }
    return item;
  }

  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.getEditButton = this.getEditButton.bind(this);
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
            clickFunction={this.props.deleteSingleColumnRow}
            objectToWorkOn={item}
            text="Delete"
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
            clickFunction={this.props.confirmationFunction}
            objectToWorkOn={item}
            text="Confirm"
            type="primary"
          />
        </td>
      );
    }
    return null;
  }

  getRow(item) {
    const headers = this.props.headerInfo.map(header => header.toLowerCase());

    if (item instanceof Object) {
      if (this.props.columFilter) {
        return Object.keys(item).filter(key => headers.includes(key)).map(key =>
          <td key={Utils.generateKey(item[key])}>{PageTableForm.checkBooleanValue(item[key])}</td>);
      }

      return Object.keys(item).map(key =>
        <td key={Utils.generateKey(item[key])} >{PageTableForm.checkBooleanValue(item[key])}</td>);
    }

    return <td key={Utils.generateKey(item)} >{PageTableForm.checkBooleanValue(item)}</td>;
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
        </tr>
      ));
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
  confirmationFunction: PropTypes.func,
  tableData: PropTypes.arrayOf(Object).isRequired,
  headerInfo: PropTypes.arrayOf(String).isRequired,
  linkTableData: PropTypes.bool,
  detailTableData: PropTypes.bool,
  columFilter: PropTypes.bool,
};

PageTableForm.defaultProps = {
  editTableData: undefined,
  deleteSingleColumnRow: undefined,
  confirmationFunction: undefined,
  linkTableData: false,
  detailTableData: false,
  columFilter: false,
};

export default PageTableForm;
