import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import ExamDetails from './ExamDetails'; // eslint-disable-line import/no-extraneous-dependencies
import PageTableForm from '../template/PageTableForm';

class AdminExams extends React.Component {
  constructor(props) {
    super(props);
    this.solarYearList = [
      '2017',
      '2016',
      '2015',
    ];
    this.examList = [
      {
        name: 'Programming',
        credits: '10',
        courseName: 'L-16',
        year: '2017',
        professorName: '',
        professorSurname: '',
        examAddress: '0x811da72aca31e56f770fc33df0e45fd08720e157',
        mandatory: true,
        courseAddress: '0x4bd1280852cadb002734647305afc1db7ddd6acb',
        professorAddress: '',
      },
      {
        name: 'Programming',
        credits: '10',
        courseName: 'L-16',
        year: '2016',
        professorName: 'Filè',
        professorSurname: 'Gilberto',
        examAddress: '0x811da72aca31e56f770fc33df0e45fd08720e157',
        mandatory: true,
        courseAddress: '0x4bd1280852cadb002734647305afc1db7ddd6acb',
        professorAddress: '0x79196b90d1e952c5a43d4847caa08d50b967c34a',
      },
      {
        name: 'Programming',
        credits: '10',
        examAddress: '0x811da72aca31e56f770fc33df0e45fd08720e157',
        courseName: 'L-16',
        year: '2015',
        professorName: 'Filè',
        professorSurname: 'Gilberto',
        mandatory: true,
        courseAddress: '0x4bd1280852cadb002734647305afc1db7ddd6acb',
        professorAddress: '0x79196b90d1e952c5a43d4847caa08d50b967c34a',
      },
      {
        name: 'Logic',
        credits: '10',
        courseName: 'L-16',
        year: '2017',
        professorName: 'Gilberto',
        professorSurname: 'Gilberto',
        examAddress: '0x811da72aca31e56f770fc33df0e45fd08720e157',
        mandatory: true,
        courseAddress: '0x4bd1280852cadb002734647305afc1db7ddd6acb',
        professorAddress: '0x79196b90d1e952c5a43d4847caa08d50b967c34a',
      },
    ];
    this.list = this.examList.filter(exam => exam.year === this.solarYearList[0]);
    this.state = {
      year: this.solarYearList[0],
      showDetails: false,
    };
    this.onChangeYear = this.onChangeYear.bind(this);
    this.viewDetails = this.viewDetails.bind(this);
  }
  onChangeYear() {
    if (this.state.year !== this.inputEl.value) {
      this.setState({ year: this.inputEl.value, showDetails: false });
      this.changeTable();
    }
  }
  changeTable() {
    this.list = this.examList.filter(exam => exam.year === this.inputEl.value);
  }
  viewDetails(item) {
    this.setState({ showDetails: true, item });
  }
  render() {
    const options = [];
    for (let i = 0; i < this.solarYearList.length; i += 1) {
      options.push(<option value={this.solarYearList[i]}>{this.solarYearList[i]}</option>);
    }
    let details = null;
    if (this.state.showDetails) {
      details = <ExamDetails object={this.state.item} show={this.state.showDetails} />;
    }
    return (
      <div>
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
          getTableData={e => e}
          tableData={this.list}
          headerInfo={['Name', 'Credits', 'CourseName', 'Year', 'ProfessorSurname', 'ProfessorName', 'Details']}
          tableButtons={[{
            buttonFunction: this.viewDetails,
            buttonText: 'Details',
            buttonType: 'default',
          }]}
          columFilter
        />
        {details}
      </div>
    );
  }
}
AdminExams.propTypes = {
  // getExams: PropTypes.func.isRequired,
  // setTeacher: PropTypes.func.isRequired,
  // examList: PropTypes.arrayOf(Object).isRequired,
  // solarYearList: PropTypes.arrayOf(String).isRequired,
};
export default AdminExams;
