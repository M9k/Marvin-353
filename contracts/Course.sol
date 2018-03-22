pragma solidity ^0.4.19;
import "./Exam.sol";


contract Course {
    uint private countListExamsByIndex = 1;
    mapping (address => uint) private listExams;
    mapping (uint => Exam) private listExamsByIndex;
    bytes32 private name;
    uint16 private creditsToGraduation;
    Year private year;
    UniversityAdmin private university;

    modifier onlyAdmin {
        if (!university.isAdmin(msg.sender)) revert();
        _;
    }

    function Course(bytes32 _name, uint16 _creditsForGraduation, University _university) public {
        name = _name;
        creditsToGraduation = _creditsForGraduation;
        university = UniversityAdmin(_university);
        year = Year(msg.sender);
    }

    function getExamNumber() public view returns(uint) {
        return countListExamsByIndex - 1;
    }

    function getExamContractAt(uint _index) public view returns(Exam) {
        return listExamsByIndex[_index + 1];
    }
    
    function getName() public view returns(bytes32) {
        return name;
    }

    function getCreditsToGraduate() public view returns(uint16) {
        return creditsToGraduation;
    }

    function getSolarYear() public view returns(uint16) {
        return year.getSolarYear();
    }

    function addNewExam(bytes32 _name, uint8 _credits, bool _obbligatoriety) public onlyAdmin {
        Exam newExam = new Exam(_name, _credits, _obbligatoriety, year, university);
        listExams[newExam] = countListExamsByIndex;
        listExamsByIndex[countListExamsByIndex] = newExam;
        countListExamsByIndex += 1;
    }
}