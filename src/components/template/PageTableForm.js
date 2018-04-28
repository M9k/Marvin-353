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
    this.getUnconfirmButton = this.getUnconfirmButton.bind(this);
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
    console.log(item);
    let path = document.location.pathname;
    path = path.concat(`/${item.code}_${item.solarYear}`);
    if (this.props.linkTableData) {
      return (
        <Button href={path}>Details</Button>
      );
    }
    return null;
  }

  getDeleteButton(item) {
    if (this.props.deleteTableData !== undefined) {
      return (
        <td><DeleteButton deleteFunction={this.props.deleteTableData} objectToRemove={item} text="Delete" /></td>
      );
    }
    return null;
  }
  getUnconfirmButton(item) {
    if (this.props.unconfirmUser !== undefined) {
      return (
        <td><DeleteButton deleteFunction={this.props.unconfirmUser} objectToRemove={item} text="Unconfirm" /></td>
      );
    }
    return null;
  }
  // eslint-disable-next-line
  getRow(item) {
    if (item instanceof Object) {
      return Object.keys(item).map(key =>
        <td>{item[key]}</td>);
    }
    return <td>{item}</td>;
  }
  getRows() {
    return this.props.tableData.map(item =>
      (
        <tr key={Utils.generateKey(item)}>
          {this.getRow(item)}
          {this.getDetailsButton(item)}
          {this.getEditButton()}
          {this.getDeleteButton({ item })}
          {this.getUnconfirmButton({ item })}
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
  unconfirmUser: PropTypes.func,
  tableData: PropTypes.arrayOf(Object).isRequired,
  headerInfo: PropTypes.arrayOf(String).isRequired,
  linkTableData: PropTypes.bool,
};

PageTableForm.defaultProps = {
  editTableData: undefined,
  unconfirmUser: undefined,
  deleteTableData: undefined,
  addTableData: undefined,
  linkTableData: false,
};

export default PageTableForm;
