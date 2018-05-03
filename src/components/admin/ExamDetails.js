import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import ModalForm from '../custom/ModalForm';

class ExamDetails extends React.Component {
  constructor(props) {
    super(props);
    this.showAssignTeacher = this.showAssignTeacher.bind(this);
    this.teacher = this.teacher.bind(this);
    this.show = this.props.show;
    this.teacherList = [
      {
        name: 'Pippo',
        surname: 'Pippo',
        address: '0x6813eb9362372eef6200f3b1dbc3f819671cba69',
      },
      {
        name: 'Pluto',
        surname: 'Pluto',
        address: '0x6813eb9362372eef6200f3b1dbc3f819671cba69',
      },
      {
        name: 'Paperino',
        surname: 'Paperino',
        address: '0x6813eb9362372eef6200f3b1dbc3f819671cba69',
      },
    ];
    this.state = {
      assignTeacher: false,
    };
    this.object = this.props.object;
    this.studentNumber = '70';
  }
  componentWillReceiveProps(nextProps) {
    this.object = nextProps.object;
  }
  showAssignTeacher() {
    this.setState({ assignTeacher: true });
  }
  teacher() {
    if (this.object.teacherName !== '' && this.object.teacherSurname !== '') {
      return (
        <dd>
          {this.object.teacherSurname}
          {this.object.teacherName}
          {this.object.teacherAddress}
        </dd>
      );
    }
    return (
      <dd>
        <Button onClick={this.showAssignTeacher}>Assign teacher</Button>
      </dd>
    );
  }

  render() {
    const options = [];
    for (let i = 0; i < this.teacherList.length; i += 1) {
      // eslint-disable-next-line
      options.push(
        <option value={this.teacherList[i].address}>
          {this.teacherList[i].surname} {this.teacherList[i].name} {this.teacherList[i].address}
        </option>);
    }
    const mandatory = (this.object.mandatory) ? 'Yes' : 'No';
    return (
      <div>
        <ModalForm
          title="Exam details"
          keyForModal={{ item: this.object }}
          show={this.show}
        >
          <dl>
            <dt>Exam Address</dt>
            <dd>{this.object.examAddress}</dd>
            <dt>Exam Name</dt>
            <dd>{this.object.name}</dd>
            <dt>Credits</dt>
            <dd>{this.object.credits}</dd>
            <dt>Mandatory</dt>
            <dd>{mandatory}</dd>
            <dt>Solar year</dt>
            <dd>{this.object.year}</dd>
            <dt>Course Address</dt>
            <dd>{this.object.courseAddress}</dd>
            <dt>Course Name</dt>
            <dd>{this.object.courseName}</dd>
            <dt>Teacher</dt>
            {this.teacher()}
            <dt>Student number</dt>
            <dd>{this.studentNumber}</dd>
          </dl>
        </ModalForm>
        <ModalForm
          title="Assign teacher"
          show={this.state.assignTeacher}
          yesFunction={e => e}
        >
          <FormGroup controlId="selectTeacher">
            <ControlLabel>Assign a teacher to the exam</ControlLabel>
            <FormControl
              onChange={e => e}
              inputRef={el => this.inputEl = el} // eslint-disable-line no-return-assign
              componentClass="select"
              placeholder="select"
            >
              {options}
            </FormControl>
          </FormGroup>
        </ModalForm>
      </div>
    );
  }
}

ExamDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  object: PropTypes.object.isRequired,
  show: PropTypes.func.isRequired,
  // studentNumber: PropTypes.number.isRequired,
  // teacherList: PropTypes.arrayOf(Object).isRequired,
  // setTeacher: PropTypes.func.isRequired,
};

export default ExamDetails;
