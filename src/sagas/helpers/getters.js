import { call, all } from 'redux-saga/effects';
import * as User from '../../web3calls/User';
import * as Exam from '../../web3calls/Exam';
import * as Course from '../../web3calls/Course';
import { toText } from '../../util/web3/textConverter';

export function* getTeacherData(teacherAddress, adapter = obj => obj) {
  const dataFetch = [
    call(User.getName, teacherAddress),
    call(User.getSurname, teacherAddress),
  ];
  const [name, surname] = yield all(dataFetch);
  return adapter({
    address: teacherAddress,
    name: toText(name),
    surname: toText(surname),
  });
}
export function* getExamData(examAddress, adapter = obj => obj) {
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
  return adapter({
    address,
    name: toText(name),
    credits,
    mandatory,
    teacherAddress,
    teacherName: toText(teacherData.name),
    teacherSurname: toText(teacherData.surname),
  });
}
export function* getCourseData(courseAddress, adapter = obj => obj) {
  const dataFetch = [
    call(Course.getName, courseAddress),
    call(Course.getSolarYear, courseAddress),
  ];
  const [courseName, solarYear] = yield all(dataFetch);
  return adapter({
    courseName: toText(courseName),
    solarYear: Number(solarYear),
  });
}
export function* getCourseExamsList(courseAddress, adapter = obj => obj) {
  const courseNumber = yield call(Course.getExamNumber, courseAddress);
  const examsAddressFetch = Array(Number(courseNumber)).fill().map((_, id) => (
    call(Course.getExamContractAt, courseAddress, id)
  ));
  const examsAddresses = yield all(examsAddressFetch);
  const examDataFetch = examsAddresses.map(addr => (
    call(getExamData, addr)
  ));
  const examsData = yield all(examDataFetch);
  return examsData.map(adapter);
}
