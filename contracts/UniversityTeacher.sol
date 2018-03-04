pragma solidity ^0.4.19;
import "./UniversityAdmin.sol";
import "./Teacher.sol";


contract UniversityTeacher is UniversityAdmin {
    // zero = not found
    uint private countTeachers = 1;
    mapping (address => uint) private teachers;
    mapping (uint => address) private teachersByIndex;
    uint private countUnconfirmedTeachers = 1;
    mapping (address => uint) private unconfirmedTeachers;
    mapping (uint => address) private unconfirmedTeachersByIndex;

    mapping (address => address) private teacherContract;

    modifier isTeacherAddress(address _address) {
        if (teachers[_address] == 0) revert();
        _;
    }

    modifier isUnconfirmedTeacherAddress(address _address) {
        if (unconfirmedTeachers[_address] == 0) revert();
        _;
    }

    //ask for teacher account
    function askForTeacherAccount(bytes32 _name, bytes32 _surname) public registrableAddress(msg.sender) {
        registered[msg.sender] = true;
        address _teacher = new Teacher(_name, _surname);
        unconfirmedTeachersByIndex[countUnconfirmedTeachers] = msg.sender;
        unconfirmedTeachers[msg.sender] = countUnconfirmedTeachers;
        teacherContract[msg.sender] = _teacher;
        countUnconfirmedTeachers++;
    }

    function isTeacher (address _address) public view returns (bool) {
        return teachers[_address] != 0;
    }

    function isUnconfirmedTeacher (address _address) public view returns (bool) {
        return unconfirmedTeachers[_address] != 0;
    }

    function getTeachersNumber() public view returns (uint) {
        return countTeachers - 1;
    }

    function getUnconfirmedTeachersNumber() public view returns (uint) {
        return countUnconfirmedTeachers - 1;
    }

    function getTeacherAtIndex(uint _index) public view returns(address) {
        return teachersByIndex[_index+1];
    }

    function getUnconfirmedTeacherAtIndex(uint _index) public view returns(address) {
        return unconfirmedTeachersByIndex[_index+1];
    }

    function confirmTeacher(address _address) public onlyAdmin
    isUnconfirmedTeacherAddress(_address) {
        removeUnconfirmedTeacher(_address);
        addTeacher(_address);
    }

    function dontConfirmTeacher(address _address) public onlyAdmin
    isUnconfirmedTeacherAddress(_address) {
        teacherContract[_address] = 0;
        removeUnconfirmedTeacher(_address);
    }

    function removeTeacher(address _address) public isTeacherAddress(_address) {
        registered[_address] = false;
        teacherContract[msg.sender] = 0;
        teachersByIndex[teachers[_address]] = teachersByIndex[countTeachers];
        teachers[_address] = 0;
        countTeachers -= 1;
    }

    // return the current user type
    function login() public view returns (uint8) {
        uint8 typeUser = super.login();

        if (isTeacher(msg.sender))
            typeUser = 3; //Teacher

        if (isUnconfirmedTeacher(msg.sender))
            typeUser = 103; /* TODO: da implementare nella GUI e nel reducer */

        return typeUser;
    }

    function getTeacherContractAddress(address _teacher) public view returns(address) {
        return teacherContract[_teacher];
    }

    function removeUnconfirmedTeacher(address _address) private {
        registered[_address] = false;
        unconfirmedTeachersByIndex[unconfirmedTeachers[_address]] =
        unconfirmedTeachersByIndex[countUnconfirmedTeachers];
        unconfirmedTeachers[_address] = 0;
        countUnconfirmedTeachers -= 1;
    }

    function addTeacher(address _address) private {
        registered[_address] = true;
        teachers[_address] = countTeachers;
        teachersByIndex[countTeachers] = _address;
        countTeachers += 1;
    }
}
