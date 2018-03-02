pragma solidity ^0.4.20;
import "./User.sol";


contract Teacher is User {
    function Teacher(bytes32 _name, bytes32 _surname) public User(_name, _surname) {
    }
}
