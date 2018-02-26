pragma solidity ^0.4.2;


contract BaseUniversity {

    address internal universityAddress;
    mapping (address => bool) public registered;
    
    //Constructor
    function BaseUniversity() public {
        universityAddress = msg.sender;
    }  
    
    //Modifiers
    modifier onlyFounder() {
        require(msg.sender == universityAddress || isAdmin(msg.sender));
        _;
    }

    modifier registrableAddress(address _address) {
        require(!registered[_address]);
        _;
    }
    
    modifier isDeletable(address _address) {
        require(registered[_address]);
        _;
    }

    //Abstract method 
    function isAdmin(address adminAddress) public view returns(bool);
}

