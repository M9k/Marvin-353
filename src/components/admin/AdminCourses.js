import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import PageTableForm from '../template/PageTableForm';
import Form from '../custom/Form';
import Utils from '../custom/utils';
import FieldTypes from '../custom/fieldtypes';

class AdminCourses extends React.Component {
  constructor(props) {
    super(props);
    this.totalCredits = [
      '120',
      '180',
      '300',
      '360',
    ];
    this.solarYearList = [
      '2017',
      '2016',
      '2015',
    ];
    this.getCourses = () => {};
    this.courseList = [
      {
        name: 'L-31',
        solarYear: '2017',
        courseAddress: '0xfae394561e33e242c551d15d4625309ea4c0b97f',
        totalCredits: 180,
      },
      {
        name: 'L-35',
        solarYear: '2016',
        courseAddress: '0xfae394561e33e242c551d15d4625309ea4c0b97f',
        totalCredits: 120,
      },
      {
        name: 'L-35',
        solarYear: '2017',
        courseAddress: '0xfae394561e33e242c551d15d4625309ea4c0b97f',
        totalCredits: 300,
      },
      {
        name: 'L-30',
        solarYear: '2015',
        courseAddress: '0xfae394561e33e242c551d15d4625309ea4c0b97f',
        totalCredits: 360,
      },
    ];
    this.list = this.courseList;
    this.state = { year: 'ALL' };
    this.onChangeYear = this.onChangeYear.bind(this);
  }
  onChangeYear() {
    if (this.state.year !== this.inputEl.value) {
      this.setState({ year: this.inputEl.value });
      this.changeTable();
    }
  }
  changeTable() {
    this.list = this.courseList;
    if (this.inputEl.value !== 'ALL') {
      this.list = this.courseList.filter(course => course.solarYear === this.inputEl.value);
    }
  }
  showExams(item) {
    let path = document.location.pathname;
    path = path.concat(`/${item.name}_${item.solarYear}`);
    document.location.href = path;
  }
  render() {
    const options = [];
    options.push(<option value="ALL">ALL</option>);
    for (let i = 0; i < this.solarYearList.length; i += 1) {
      options.push(<option value={this.solarYearList[i]}>{this.solarYearList[i]}</option>);
    }

    return (
      <div>
        <Form
          description="Add a new course"
          fields={[
            {
              name: 'courseCode',
              label: 'Code:',
              help: 'insert the code of the course',
              placeholder: 'A-36',
              type: FieldTypes.TEXT,
              validateFunction: Utils.notNullValue,
            },
            {
              name: 'courseYear',
              label: 'Academic Year:',
              help: 'insert the associated year',
              type: FieldTypes.SELECT,
              values: this.solarYearList,
              validateFunction: Utils.alwaysTrue,
            },
            {
              name: 'courseTotalCredits',
              label: 'Total credits:',
              help: 'insert the total credits',
              type: FieldTypes.SELECT,
              values: this.totalCredits,
              validateFunction: Utils.alwaysTrue,
            },
          ]}
          submitFunction={null}
        />
        <FormGroup controlId="selectYear">
          <ControlLabel>Filter by academic year</ControlLabel>
          <FormControl
            onChange={this.onChangeYear}
            inputRef={el => this.inputEl = el} // eslint-disable-line no-return-assign
            componentClass="select"
            placeholder="select"
          >
            {options}
          </FormControl>
        </FormGroup>
        <PageTableForm
          getTableData={this.getCourses}
          tableData={this.list}
          headerInfo={['name', 'solarYear', 'Details']}
          tableButtons={[{
            buttonFunction: this.showExams,
            buttonText: 'Details',
            buttonType: 'default',
          }]}
          columFilter
        />
      </div>
    );
  }
}

AdminCourses.propTypes = {
  // addCourse: PropTypes.func.isRequired,
  // getCourses: PropTypes.func.isRequired,
  // validCourse: PropTypes.func.isRequired,
  // courseList: PropTypes.arrayOf(Object).isRequired,
  // solarYearList: PropTypes.arrayOf(String).isRequired,
};

export default AdminCourses;

