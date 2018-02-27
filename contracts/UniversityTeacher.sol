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

    //ask for teacher account
    function askForTeacherAccount(bytes32 _name, bytes32 _surname) public registrableAddress(msg.sender) 
    {
        address _teacher = new Teacher(_name, _surname);
        unconfirmedTeachersByIndex[countUnconfirmedTeachers] = _teacher;
        unconfirmedTeachers[_teacher] = countUnconfirmedTeachers;
        countUnconfirmedTeachers++;
    }

    function isTeacher (address _address) public view returns (bool response) {
        return teachers[_address] != 0;
    } 

    function login() public view returns (uint typeUser) {
        typeUser = super.login();

        if (isTeacher(msg.sender))
            typeUser = 3; //Teacher
    }
}
