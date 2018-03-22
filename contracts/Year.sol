pragma solidity ^0.4.19;
import "./University.sol";
import "./UniversityAdmin.sol";
import "./Course.sol";


contract Year {
    University private university;
    uint private countListCourseByIndex = 1;
    mapping (address => uint) private listCourse;
    mapping (uint => Course) private listCourseByIndex;
    uint16 private solarYear;

    modifier onlyAdmin {
        if (!UniversityAdmin(university).isAdmin(msg.sender)) revert();
        _;
    }

    function Year(uint16 _solarYear) public {
        solarYear = _solarYear;
        university = University(msg.sender);
    }
    
    function getCourseNumber() public view returns(uint) {
        return countListCourseByIndex - 1;
    }

    function getCourseContractAt(uint _index) public view returns(Course) {
        return listCourseByIndex[_index + 1];
    }
    
    function getSolarYear() public view returns(uint16) {
        return solarYear;
    }

    function addNewCourse(bytes32 _name, uint16 _creditsForGraduation) public onlyAdmin {
        Course newCourse = new Course(_name, _creditsForGraduation, university);
        listCourse[newCourse] = countListCourseByIndex;
        listCourseByIndex[countListCourseByIndex] = newCourse;
        countListCourseByIndex += 1;
    }
}