pragma solidity ^0.4.19;
import "./User.sol";
import "./Exam.sol";
import "./Student.sol";


contract Teacher is User {
    uint private countAssignedExam = 1;
    mapping (uint => Exam) private assignedExam;

/* solhint-disable */
    function Teacher(bytes32 _name, bytes32 _surname, address _publicAddress)
    public User(_name, _surname, _publicAddress) {
        // nop
    }
/* solhint-enable */

    function getExamNumber() public view returns(uint) {
        return countAssignedExam - 1;
    }

    function getExamContractAt(uint _index) public view returns(Exam) {
        return assignedExam[_index + 1];
    }
    
    //the index are static, and the teacher cannot exploit it, because if the index is wrong it doesn't work 
    function registerNewVoteStudentExam(uint _examindex, uint _student, uint8 _valuation) public onlySubject {
        Exam exam = getExamContractAt(_examindex);
        Student student = exam.getEnrolledContractAt(_student);
        student.registerValuation(student.getIndexOfExam(exam), _valuation);
    }
}