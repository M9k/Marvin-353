pragma solidity ^0.4.2;

import './User.sol';

contract AdminUser is User {

    function AdminUser(string _name, string _surname) public {
        name = _name;
        surname = _surname;
        myAddress = msg.sender;
    }

    function getName() public view returns(string) {
        return name;
    }

    function getSurname() public view returns(string) {
        return surname;
    }

    //Altre funzionalità o valori per gli amministratori
}
