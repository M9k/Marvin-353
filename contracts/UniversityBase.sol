pragma solidity ^0.4.19;


contract UniversityBase {
    address private universityAddress;

    mapping (address => bool) registered;

    //Constructor
    function UniversityBase() public {
        universityAddress = msg.sender;
        registered[msg.sender] = true;
    }

    modifier onlyFounder {
        if (msg.sender != universityAddress) revert();
        _;
    }

    modifier registrableAddress(address _address) {
        if (registered[_address]) revert();
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
}
