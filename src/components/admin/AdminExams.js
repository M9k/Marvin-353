import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import PageTableForm from '../template/PageTableForm';

class AdminExams extends React.Component {
  constructor(props) {
    super(props);
    this.solarYears = [
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
        professorName: 'Filè',
        professorSurname: 'Gilberto',
        examAddress: '0x811da72aca31e56f770fc33df0e45fd08720e157',
        mandatory: 'yes',
        courseAddress: '0x4bd1280852cadb002734647305afc1db7ddd6acb',
        professorAddress: '0x79196b90d1e952c5a43d4847caa08d50b967c34a',
      },
      {
        name: 'Programming',
        credits: '10',
        courseName: 'L-16',
        year: '2016',
        professorName: 'Filè',
        professorSurname: 'Gilberto',
        examAddress: '0x811da72aca31e56f770fc33df0e45fd08720e157',
        mandatory: 'yes',
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
        mandatory: 'yes',
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
        mandatory: 'yes',
        courseAddress: '0x4bd1280852cadb002734647305afc1db7ddd6acb',
        professorAddress: '0x79196b90d1e952c5a43d4847caa08d50b967c34a',
      },
    ];
    this.list = this.examList.filter(exam => exam.year === this.solarYears[0]);
    this.state = { year: this.solarYears[0] };
    this.onChangeYear = this.onChangeYear.bind(this);
  }
  onChangeYear() {
    if (this.state.year !== this.inputEl.value) {
      this.setState({ year: this.inputEl.value });
      this.changeTable();
    }
  }
  changeTable() {
    this.list = this.examList.filter(exam => exam.year === this.inputEl.value);
  }
  render() {
    const options = [];
    for (let i = 0; i < this.solarYears.length; i += 1) {
      options.push(<option value={this.solarYears[i]}>{this.solarYears[i]}</option>);
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
          headerInfo={['Name', 'Credits', 'Course', 'Year', 'Teacher surname', 'Teacher name', 'Details']}
          detailTableData={true} // eslint-disable-line
        />
      </div>
    );
  }
}

export default AdminExams;
