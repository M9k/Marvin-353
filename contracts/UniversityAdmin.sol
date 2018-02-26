pragma solidity ^0.4.19;
import "./UniversityBase.sol";


contract UniversityAdmin is UniversityBase {
    uint private countAdministrators;
    mapping (address => bool) private administrators;
    mapping (uint => address) private administratorsByIndex;

    //add an admin
    function newAdmin(address _adminAddress)  public onlyFounder
    registrableAddress(_adminAddress) {
        registered[_adminAddress] = true;
        administrators[_adminAddress] = true;
        administratorsByIndex[countAdministrators] = _adminAddress;
        countAdministrators += 1;
    }

    //Check if a _adminAddress is an admin
    function isAdmin(address _adminAddress) public view returns(bool) {
        return administrators[_adminAddress];
    }

    //Return the number of admins
    function getAdminsNumber() public view returns(uint) {
        return countAdministrators;
    }

    //return the admin ad index _index
    function getAdminAt(uint _index) public view returns(address) {
        return administratorsByIndex[_index];
    }

    function login() public view returns (uint typeUser) {
        typeUser = super.login();

        if (isAdmin(msg.sender))
            typeUser = 2; //Admin
/*
        if (isTeacher(_userAddr))
            typeUser = 3; //Professor

        if (isStudent(_userAddr))
            typeUser = 4; //Student
*/
    }
}