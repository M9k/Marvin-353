pragma solidity ^0.4.19;
import "./UniversityYear.sol";
import "./Teacher.sol";
import "./Exam.sol";


contract UniversityExam is UniversityYear {
    function associateTeacherToExam(Teacher _teacher, Exam _exam) public onlyAdmin {
        _exam.associateTeacher(_teacher);
    }
}