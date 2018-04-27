import React from 'react';
import PageTableForm from '../template/PageTableForm';
import Form from '../custom/Form';
import Utils from '../custom/utils';
import FieldTypes from '../custom/fieldtypes';
import Field from '../custom/Field';

class AdminCourses extends React.Component {
  static changeYear() {
    console.log('CHANGEEE');
    /* da finire
    const select = document.getElementsByClassName('form-control');
    const year = select[2].getState();
    console.log(year);
    // const year = select.options[select.selectedIndex].value;
    console.log(select);
    // console.log(year);
    /*
    this.list = this.degreeCoursesList.filter(course => course.solarYear === year);
    */
  }
  constructor(props) {
    super(props);
    this.solarYears = [
      '2017',
      '2016',
    ];
    this.getCourses = () => {
    };
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
    ];
    this.list = this.degreeCoursesList;
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
        <Field
          name="filterYear"
          label="Filter course by academic Year"
          type={FieldTypes.SELECT}
          values={this.solarYears}
          validateFunction={Utils.notNullValue}
          onChangeValue={this.changeYear}
        />
        <PageTableForm
          getTableData={this.getCourses}
          tableData={this.list}
          headerInfo={['Course code', 'Academic Year']}
        />
      </div>
    );
  }
}

AdminCourses.propTypes = {
  // addCourse: PropTypes.func.isRequired,
  // getCourses: PropTypes.func.isRequired,
  // degreeCoursesList: PropTypes.arrayOf(Object).isRequired,
};

export default AdminCourses;

