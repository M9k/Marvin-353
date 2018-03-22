pragma solidity ^0.4.19;
import "./User.sol";
import "./Exam.sol";
import "./Course.sol";
import "./Teacher.sol";


contract Student is User {
    uint private countListExam;
    mapping (uint => Exam) private listExam;
    mapping (uint => bool) private subscription; // 0 = false
    mapping (uint => uint8) private valuation; // tutto scalato di uno, 32 = 30L, 19 => 18, 0 => non assegnato
    Course private course;

    modifier correctValuation(uint8 value) {
        if (value < 0 || value > 33) revert();
        _;
    }

    modifier confirmedStudent() {
        if (university.getRoleByAddress(publicAddress) != 4) revert();
        _;
    }

    modifier byCorrectProfessor(uint _ofExam) {
        if (Teacher(msg.sender) != listExam[_ofExam].getTeacherContract()) revert();
        _;
    }

    function Student(bytes32 _name, bytes32 _surname, address _publicAddress, Course _course)
    public User(_name, _surname, _publicAddress) {
        course = _course;
        countListExam = course.getExamNumber();
        for (uint i = 0; i < countListExam; i++) {
            listExam[i] = course.getExamContractAt(i);
            subscription[i] = listExam[i].getObbligatoriety();
            if (subscription[i])
                listExam[i].addSubscribers();
        }
    }

    function getCourseContract() public view returns(Course) {
        return course;
    }

    function getExamNumber() public view returns(uint) {
        return countListExam;
    }

    function getExamContractAt(uint _index) public view returns(Exam) {
        return listExam[_index];
    }
    
    function getExamSubscriptionAt(uint _index) public view returns(bool) {
        return subscription[_index];
    }

    function getExamValuationAt(uint _index) public view returns(uint8) {
        return valuation[_index];
    }

    function enrollToOptionalExam(uint _index) public onlySubject {
        subscription[_index] = true;
        listExam[_index].addSubscribers();
    }

    function registerValuation(uint _exam, uint8 _valuation) public
    correctValuation(_valuation) byCorrectProfessor(_exam) confirmedStudent {
        valuation[_exam] = _valuation;
    }

    function getIndexOfExam(Exam exam) public view returns(uint) {
        for (uint index = 0; index < countListExam; index++)
            if (listExam[index] == exam)
                return index;
    }
}