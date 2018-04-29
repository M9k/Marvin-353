import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import ModalForm from './ModalForm';

class DetailsButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.showAssignTeacher = this.showAssignTeacher.bind(this);
    this.teacher = this.teacher.bind(this);
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
      show: false,
      assignTeacher: false,
    };
    this.object = this.props.object;
    console.log(this.props.object);
    this.student = '70';
  }

  handleClick() {
    this.setState({
      show: true,
    });
  }

  showAssignTeacher() {
    this.setState({ assignTeacher: true });
  }

  teacher() {
    if (this.object.teacher_name !== '' && this.object.teacher_surname !== '') {
      return (
        <dd>{this.object.teacher_surname} {this.object.teacher_name}</dd>
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
    return (
      <div>
        <Button onClick={this.handleClick}>{this.props.text}</Button>
        <ModalForm
          title="Exam details"
          show={this.state.show}
        >
          <dl>
            <dt>Name</dt>
            <dd>{this.object.name}</dd>
            <dt>Credits</dt>
            <dd>{this.object.credits}</dd>
            <dt>Student number</dt>
            <dd>{this.student}</dd>
            <dt>Teacher</dt>
            {this.teacher()}
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

DetailsButton.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  object: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  // student: PropTypes.number,
};

export default DetailsButton;
