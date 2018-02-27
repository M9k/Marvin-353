pragma solidity ^0.4.19;
import "./Teacher.sol";


contract Teacher is User {
    function Teacher(bytes32 _name, bytes32 _surname) public User(_name, _surname) {
    }
}
