import { call, all } from 'redux-saga/effects';
import * as User from '../../web3calls/User';
import * as Exam from '../../web3calls/Exam';
import * as Course from '../../web3calls/Course';

export function* getTeacherData(teacherAddress) {
  const dataFetch = [
    call(User.getName, teacherAddress),
    call(User.getSurname, teacherAddress),
  ];
  const [name, surname] = yield all(dataFetch);
  return {
    address: teacherAddress,
    name,
    surname,
  };
}
export function* getExamData(examAddress) {
  const address = examAddress;
  const dataFetch = [
    call(Exam.getName, address),
    call(Exam.getCredits, address),
    call(Exam.getObligatoriness, address),
    call(Exam.getTeacherContract, address),
  ];
  const [name, credits, mandatory, teacherAddress] = yield all(dataFetch);
  let teacherData;
  if (teacherAddress === null) {
    teacherData = { name: null, surname: null };
  } else {
    teacherData = yield call(getTeacherData, teacherAddress);
  }
  return {
    address,
    name,
    credits,
    mandatory,
    teacherAddress,
    teacherName: teacherData.name,
    teacherSurname: teacherData.surname,
  };
}
export function* getCourseData(courseAddress) {
  const dataFetch = [
    call(Course.getName, courseAddress),
    call(Course.getSolarYear, courseAddress),
  ];
  const [courseName, solarYear] = yield all(dataFetch);
  return {
    courseName,
    courseAddress,
    solarYear: Number(solarYear),
  };
}
export function* getCourseExamsList(courseAddress) {
  const courseNumber = yield call(Course.getExamNumber, courseAddress);
  const examsAddressFetch = Array(Number(courseNumber)).fill().map((_, id) => (
    call(Course.getExamContractAt, courseAddress, id)
  ));
  const examsAddresses = yield all(examsAddressFetch);
  const examDataFetch = examsAddresses.map(addr => (
    call(getExamData, addr)
  ));
  const examsData = yield all(examDataFetch);
  return examsData;
}
