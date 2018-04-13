import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import Form from '../custom/form';
import DeleteButton from '../custom/deleteButton';


class PageTableForm extends React.Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.getButtons = this.getButtons.bind(this);
    this.isFormRequired = this.isFormRequired.bind(this);
  }

  componentWillMount() {
    this.refreshData();
  }

  getButtons() {
    if (this.props.deleteTableData() !== -1) {
      return (<td><DeleteButton deleteFunction={this.props.deleteTableData} /></td>);
    }
    if (this.props.editTableData() !== -1) {
      return (<td><Button onClick={this.props.editTableData}>Edit button</Button></td>);
    }
    return '';
  }

  refreshData() {
    this.props.getTableData(); // ask redux the table data array
  }

  isFormRequired() {
    if (this.props.addTableData() !== -1) {
      return <Form submitFunction={this.props.getTableData} />;
    }
    return '';
  }

  render() {
    return (
      <div>
        {this.isFormRequired()}
        <Table striped bordered condensed hover>
          <tbody>
            {this.props.tableData.map(item => <tr><td>{item}</td> {this.getButtons()}</tr>)}
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
};

PageTableForm.defaultProps = {
  editTableData: () => -1,
  deleteTableData: () => -1,
  addTableData: () => -1,
};

export default PageTableForm;
