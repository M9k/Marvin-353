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
    this.getDetailsButton = this.getDetailsButton.bind(this);
    this.getButton = this.getButton.bind(this);
    this.getRows = this.getRows.bind(this);
    this.getRow = this.getRow.bind(this);
  }

  componentWillMount() {
    this.refreshData();
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

  // eslint-disable-next-line
  getButton(key, item) {
    return (
      <td>
        <TemplateButton
          clickFunction={key.buttonFunction}
          objectToWorkOn={item}
          text={key.buttonText}
          type={key.buttonType}
        />
      </td>
    );
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
          {this.props.tableButtons.map(key => (
            this.getButton(key, item)
          ))}
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
  tableData: PropTypes.arrayOf(Object).isRequired,
  headerInfo: PropTypes.arrayOf(String).isRequired,
  // Temporaneamente not required, ma da aggiornare in isRequired piu avanti
  tableButtons: PropTypes.arrayOf(Object),
  linkTableData: PropTypes.bool,
  detailTableData: PropTypes.bool,
  columFilter: PropTypes.bool,
};

PageTableForm.defaultProps = {
  linkTableData: false,
  detailTableData: false,
  columFilter: false,
  tableButtons: [],
};

export default PageTableForm;
