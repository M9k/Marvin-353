pragma solidity ^0.4.2;

contract Student {
  address public creator;
  bytes32 public name;
  bytes32 public surname;
  bool public registered;

  function Student(bytes32 _name, bytes32 _surname) public {
    creator = msg.sender;
    name = _name;
    surname = _surname;
    registered = false;
  }

}
