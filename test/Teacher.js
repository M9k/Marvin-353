const Student = artifacts.require('./contracts/Student.sol');
const Teacher = artifacts.require('./contracts/Teacher.sol');
const UniversityExam = artifacts.require('./contracts/UniversityExam.sol');
const Year = artifacts.require('./contracts/Year.sol');
const Course = artifacts.require('./contracts/Course.sol');
const Exam = artifacts.require('./contracts/Exam.sol');
const { assert } = require('chai');

contract('Teacher', (accounts) => {
  let university;
  let teacher;
  let student;
  let year;
  let course;
  let exam1;
  let exam2;

  beforeEach('Deploy Student contract on blockchain', async () => {
    university = await UniversityExam.new({ from: accounts[0] });
    // add an admin
    await university.newAdmin(accounts[1], { from: accounts[0] });
    // add a teacher
    await university.requestTeacherAccount(123, 456, { from: accounts[2] });
    await university.confirmTeacher(
      await university.getNotApprovedTeacherContractAddressAt.call(0),
      { from: accounts[1] },
    );
    teacher = Teacher.at(await university.getTeacherContractFromPublicAddress.call(accounts[2]));
    // add a year
    await university.addNewAcademicYear(2018, { from: accounts[0] }, { from: accounts[0] });
    year = Year.at(await university.getAcademicYearContractByYear.call(2018));
    // add a course
    await year.addNewCourse(123, 180, { from: accounts[1] });
    course = Course.at(await year.getCourseContractAt.call(0));
    // add some exam
    await course.addNewExam(123, 12, true, { from: accounts[1] });
    exam1 = Exam.at(await course.getExamContractAt.call(0));
    await course.addNewExam(456, 10, false, { from: accounts[1] });
    exam2 = Exam.at(await course.getExamContractAt.call(1));
    // associate exams to teacher
    await university.associateTeacherToExam(
      teacher.address,
      exam1.address,
      { from: accounts[1] },
    );
    await university.associateTeacherToExam(
      teacher.address,
      exam2.address,
      { from: accounts[1] },
    );
    // add a student
    await university.requestStudentAccount(123, 456, course.address, { from: accounts[3] });
    await university.confirmStudent(
      await university.getNotApprovedStudentContractAddressAt.call(0),
      { from: accounts[1] },
    );
    student = Student.at(await university.getStudentContractFromPublicAddress.call(accounts[3]));
  });

  it('The teacher should register a valuation', async () => {
    assert.equal(await teacher.getExamContractAt.call(0), exam1.address);
    assert.equal(await exam1.getEnrolledNumber.call(), 1);
    assert.equal(await exam1.getEnrolledContractAt.call(0), student.address);
    await teacher.registerNewVoteStudentExam(0, 0, 19, { from: accounts[2] });
    assert.equal(await student.getExamValuationAt.call(0), 19);
  });
  it('Shouldn\'t register incorrect valuation (negative)', async () => {
    try {
      await teacher.registerNewVoteStudentExam(0, 0, -1, { from: accounts[2] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });

  it('Shouldn\'t register incorrect valuation (too high)', async () => {
    try {
      await teacher.registerNewVoteStudentExam(0, 0, 33, { from: accounts[2] });
    } catch (e) {
      return true;
    }
    throw new Error('Test failed!');
  });

  // TODO:
  // register to a unconfirmed student
  // register by the incorrect professor
  // register only if the student is enrolled
});
