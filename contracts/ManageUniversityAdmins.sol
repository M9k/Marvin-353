pragma solidity ^0.4.2;

import "./BaseUniversity.sol";


contract ManageUniversityAdmins is BaseUniversity {
    
    //All administrators
    uint internal countAdministrators;
    mapping (address => bool) private administrators;

    //Add new administrator
    function newAdmin(address adminAddress) public onlyFounder
    registrableAddress(adminAddress) {
        registered[adminAddress] = true;
        administrators[adminAddress] = true;
        countAdministrators += 1;
    }  
   /* //Delete exsisting administrator
    function deleteAdmin(address adminAddress) public onlyFounder
    isDeletable(adminAddress) {
        registered[adminAddress] = false;
        administrators[adminAddress] = false;
        countAdministrators -= 1;
    }*/
    
    //Cheaking if is administrator
    function isAdmin(address adminAddress) public view returns(bool) {
        return administrators[adminAddress];
    }

}