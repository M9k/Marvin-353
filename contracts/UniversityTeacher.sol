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

    modifier isTeacherAddress(address _address) {
        require(teachers[_address] != 0);
        _;
    }

    modifier isUnconfirmedTeacherAddress(address _address) {
        require(unconfirmedTeachers[_address] != 0);
        _;
    }

    //ask for teacher account
    function askForTeacherAccount(bytes32 _name, bytes32 _surname) public registrableAddress(msg.sender) 
    {
        address _teacher = new Teacher(_name, _surname);
        registered[_teacher] = true;
        unconfirmedTeachersByIndex[countUnconfirmedTeachers] = _teacher;
        unconfirmedTeachers[_teacher] = countUnconfirmedTeachers;
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
        return teachersByIndex[_index-1];
    }

    function getUnconfirmedTeacherAtIndex(uint _index) public view returns(address) {
        return unconfirmedTeachersByIndex[_index-1];
    }

    function confirmTeacher(address _address) public onlyFounder {
        removeUnconfirmedTeacher(_address);
        addTeacher(_address);
    }
    
    function removeTeacher(address _address) public isTeacherAddress(_address) {
        registered[_address] = false;
        teachersByIndex[teachers[_address]] = teachersByIndex[countTeachers];
        teachers[_address] = 0;
        countTeachers -= 1;
    }

    function removeUnconfirmedTeacher(address _address) public isUnconfirmedTeacherAddress(_address) {
        registered[_address] = false;
        unconfirmedTeachersByIndex[unconfirmedTeachers[_address]] =
            unconfirmedTeachersByIndex[countUnconfirmedTeachers];
        unconfirmedTeachers[_address] = 0;
        countUnconfirmedTeachers -= 1;
    }

    function login() public view returns (uint typeUser) {
        typeUser = super.login();

        if (isTeacher(msg.sender))
            typeUser = 3; //Teacher

        if (isUnconfirmedTeacher(msg.sender))
            typeUser = 403; // TODO: da implementare
    }

    function addTeacher(address _address) private isUnconfirmedTeacherAddress(_address) {
        registered[_address] = true;
        teachers[_address] = countTeachers;
        teachersByIndex[countTeachers] = _address;
        countTeachers += 1;
    }
}
