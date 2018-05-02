import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import { creators as universitySagaAction } from '../../sagas/ManageYearsSaga';
import { creators as courseSagaAction } from '../../sagas/CourseSaga';

import PageTableForm from '../template/PageTableForm';
import Form from '../custom/Form';
import Utils from '../custom/utils';
import FieldTypes from '../custom/fieldtypes';

class AdminCourses extends React.Component {
  constructor(props) {
    super(props);
    this.props.getYears();

    this.totalCredits = [
      '120',
      '180',
      '300',
      '360',
    ];

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

  // Questa funzione non può essere statica
  showExams(item) { // eslint-disable-line class-methods-use-this
    let path = document.location.pathname;
    path = path.concat(`/${item.name}_${item.solarYear}`);
    document.location.href = path;
  }
  render() {
    const options = [];
    options.push(<option key={Utils.generateKey('ALL')} value="ALL">ALL</option>);
    const years = this.props.academicYears;
    for (let i = 0; i < years.length; i += 1) {
      // eslint-disable-next-line max-len
      options.push(<option key={Utils.generateKey(years[i])} value={years[i]}>{years[i]}</option>);
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
              values: this.props.academicYears,
              validateFunction: Utils.notNullValue,
            },
            {
              name: 'courseTotalCredits',
              label: 'Total credits:',
              help: 'insert the total credits',
              type: FieldTypes.SELECT,
              values: this.totalCredits,
              validateFunction: Utils.notNullValue,
            },
          ]}
          submitFunction={this.props.addCourse}
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
          getTableData={this.props.getCourses}
          tableData={this.props.courseList}
          headerInfo={['Name', 'SolarYear', 'Details']}
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
  addCourse: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  // validCourse: PropTypes.func.isRequired,
  courseList: PropTypes.arrayOf(Object).isRequired,
  getYears: PropTypes.func.isRequired,
  academicYears: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = state => ({
  courseList: state.course.list,
  academicYears: state.manageYears.accademicYears,
});

function mapDispatchToProps(dispatch) {
  return {
    addCourse: objForm => dispatch(courseSagaAction.addNewCourse(
      objForm.courseYear.value,
      objForm.courseCode.value,
      objForm.courseTotalCredits.value,
    )),
    getCourses: () => dispatch(courseSagaAction.getAllCourses()),
    getYears: () => dispatch(universitySagaAction.getAllYears()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCourses);

