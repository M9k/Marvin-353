pragma solidity ^0.4.19;


contract User {
    address public publicAddress;
    bytes32 public name;
    bytes32 public surname;

    function User(bytes32 _name, bytes32 _surname) public {
        publicAddress = msg.sender;
        name = _name;
        surname = _surname;
    }
}
