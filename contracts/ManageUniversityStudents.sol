pragma solidity ^0.4.2;

import "./ManageUniversityAdmins.sol";


contract ManageUniversityStudents is ManageUniversityAdmins {
    
    //All administrators
    uint internal countStudent;
    mapping (address => bool) private students;
    
    //Add new administrator
    function newStudent(address _student) public onlyFounder
    registrableAddress(_student) {
        registered[_student] = true;
        students[_student] = true;
        countStudent += 1;
    }  
   /* //Delete exsisting administrator. Ancora da provare.
    function deleteAdmin(address _student) public onlyFounder
    isDeletable(_student) {
        registered[_student] = false;
        students[_student] = false;
        countStudent -= 1;
    }*/
    
    //Cheaking if is administrator
    function isStudent(address _student) public view returns(bool) {
        return students[_student];
    }

}