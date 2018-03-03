pragma solidity ^0.4.19;
import "./UniversityBase.sol";


contract UniversityAdmin is UniversityBase {
    // zero = not found
    uint private countAdministrators = 1;
    mapping (address => uint) internal administrators;
    mapping (uint => address) internal administratorsByIndex;

    modifier validAdminAddress(address _address) {
        if (administrators[_address] == 0) revert();
        _;
    }

    modifier onlyAdmin {
        if (administrators[msg.sender] == 0) revert();
        _;
    }

    //add an admin
    function newAdmin(address _adminAddress) public onlyFounder
    registrableAddress(_adminAddress)
    {
        registered[_adminAddress] = true;
        administrators[_adminAddress] = countAdministrators;
        administratorsByIndex[countAdministrators] = _adminAddress;
        countAdministrators += 1;
    }

    //Check if a _adminAddress is an admin
    function isAdmin(address _adminAddress) public view returns(bool) {
        return administrators[_adminAddress] != 0;
    }

    //Return the number of admins
    function getAdminsNumber() public view returns(uint) {
        return countAdministrators - 1;
    }

    //return the admin ad index _index
    function getAdminAt(uint _index) public view returns(address) {
        return administratorsByIndex[_index + 1];
    }
    //get index of admin with address of not usefull

    //remove the admin with address _address
    function removeAdmin(address _address) public onlyFounder validAdminAddress(_address) {
        registered[_address] = false;
        administratorsByIndex[administrators[_address]] = administratorsByIndex[countAdministrators];
        administrators[_address] = 0;
        countAdministrators -= 1;
    }

    function login() public view returns (uint8) {
        uint8 typeUser = super.login();

        if (isAdmin(msg.sender))
            typeUser = 2; //Admin

        return typeUser;
    }
}
