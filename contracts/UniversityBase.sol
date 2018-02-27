pragma solidity ^0.4.2;
import "./Student.sol";

contract UniversityBase {
    address private universityAddress;

    mapping (address => bool) registered;

    //Constructor
    function UniversityBase() public {
        universityAddress = msg.sender;
        registered[msg.sender] = true;
    }

    modifier onlyFounder {
        require(msg.sender == universityAddress);
        _;
    }

    modifier registrableAddress(address _address) {
        require(!registered[_address]);
        _;
    }

    //Function to check if an address is of the university creator
    function isUniversityFounder(address possibleUniversityAddress) public view returns(bool) {
        return possibleUniversityAddress == universityAddress;
    }

    function login() public view returns (uint typeUser) {
        typeUser = 0; //notRegistered

        if (isUniversityFounder(msg.sender))
            typeUser = 1; //University
    }


    event NewStudentAdded(address studentAddr);

    function createStudent(bytes32 _name, bytes32 _surname) public {
      address studentAddr = new Student(_name,_surname);
      NewStudentAdded(studentAddr);
    }

    function getStudentName(address studentToRegister) public view returns(bytes32 name) {
      Student stud = Student(studentToRegister);
      name = stud.name();
    }

}
