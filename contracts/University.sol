pragma solidity ^0.4.2;

contract University {

  address private universityAddress;

  //Tutti gli studenti
  uint public countStudents;
  mapping (address => bool) private students;

  //Tutti i docenti
  uint public countTeachers;
  mapping (address => bool) private teachers;

  //Tutti gli aministratori
  uint public countAdministrators;
  mapping (address => bool) private administrators;

  //Costruttore
  function newUniversity()public {
    universityAddress=msg.sender;
  }

  modifier onlyAllowed {
    require(msg.sender==universityAddress || isAdmin(msg.sender));
    _;
  }

  //Per aggiungere uno studente.
  function newStudent(address studentAddress)  public {
    if(studentAddress!=0){
      if(isStudent(studentAddress)){
        return;
      }
      students[studentAddress] = true;
      countStudents=countStudents+1;
    }
  }

  //Per aggiungere uno docente.
  function newTeacher(address teacherAddress)  public {
    if(teacherAddress!=0){
      if(isTeacher(teacherAddress)){
        return;
      }
      teachers[teacherAddress] = true;
      countTeachers=countTeachers+1;
    }
  }

  //Per aggiungere un admin.
  function newAdmin(address adminAddress)  public {
    if(adminAddress!=0){
      if(isAdmin(adminAddress)){
        return;
      }
      administrators[adminAddress] = true;
      countAdministrators=countAdministrators+1;
    }
  }

  //Funzione per verificare se esiste uno studente dato un address
  function isStudent(address studentAddress) public view returns(bool) {
    return students[studentAddress];
  }

  //Funzione per verificare se esiste un docente dato un address
  function isTeacher(address teacherAddress) public view returns(bool) {
    return teachers[teacherAddress];
  }

  //Funzione per verificare se esiste un aministratore dato un address
  function isAdmin(address adminAddress) public view returns(bool) {
    return administrators[adminAddress];
  }

  //Ritorna numero dei studenti
  function getStudentsNumber() public view returns(uint){
    return countStudents;
  }

  //Ritorna numero dei docenti
  function getTeachersNumber() public view returns(uint){
    return countTeachers;
  }

  //Ritorna numero dei admin
  function getAdminsNumber() public view returns(uint){
    return countAdministrators;
  }

}
