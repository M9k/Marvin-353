import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import PageTableForm from '../template/PageTableForm';
import Form from '../custom/Form';
import Utils from '../custom/utils';
import FieldTypes from '../custom/fieldtypes';

class AdminCourses extends React.Component {
  constructor(props) {
    super(props);
    this.solarYears = [
      '2017',
      '2016',
      '2015',
    ];
    this.getCourses = () => {};
    this.degreeCoursesList = [
      {
        code: 'L-31',
        solarYear: '2017',
      },
      {
        code: 'L-35',
        solarYear: '2016',
      },
      {
        code: 'L-35',
        solarYear: '2017',
      },
      {
        code: 'L-30',
        solarYear: '2015',
      },
    ];
    this.links = [];
    for (let i = 0; i < this.degreeCoursesList.length; i += 1) {
      this.links.push(`/courses/${this.degreeCoursesList[i].code}_${this.degreeCoursesList[i].solarYear}`);
    }
    console.log(this.links);
    this.list = this.degreeCoursesList;
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
    this.list = this.degreeCoursesList;
    if (this.inputEl.value !== 'ALL') {
      this.list = this.degreeCoursesList.filter(course => course.solarYear === this.inputEl.value);
    }
  }
  render() {
    /*
    for (let i = 0; i < degreeCoursesList.length; i += 1) {
      degreeCoursesList[i].code =
        <Link href={`/courses/${degreeCoursesList[i].code}_${degreeCoursesList[i].solarYear}`}>
          {degreeCoursesList[i].name}
        </Link>;
    }
    */
    const options = [];
    options.push(<option value="ALL">ALL</option>);
    for (let i = 0; i < this.solarYears.length; i += 1) {
      options.push(<option value={this.solarYears[i]}>{this.solarYears[i]}</option>);
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
              values: this.solarYears,
              validateFunction: Utils.moreThanCurrentYear,
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
          headerInfo={['Course code', 'Academic Year', 'Details']}
          linkTableData="true"
          linkData={this.links}
        />
      </div>
    );
  }
}

AdminCourses.propTypes = {
  // addCourse: PropTypes.func.isRequired,
  // getCourses: PropTypes.func.isRequired,
  // degreeCoursesList: PropTypes.arrayOf(Object).isRequired,
  // validCourse: PropTypes.func.isRequired,
};

export default AdminCourses;

