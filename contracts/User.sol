pragma solidity ^0.4.2;

contract User {
    string internal name;
    string internal surname;
    address public myAddress;

    function getName() public view returns(string);
    function getSurname() public view returns(string);
}
