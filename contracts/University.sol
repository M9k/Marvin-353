pragma solidity ^0.4.2;


contract University {

    address private universityAddress;

      // IN SOTTOCONTRATTI!
    mapping (address => bool) private registered;

    //Tutti gli studenti
    uint private countStudents;
    mapping (address => bool) private students;
    mapping (uint => address) private studentsByIndex;

    //Tutti i docenti
    uint private countTeachers;
    mapping (address => bool) private teachers;
    mapping (uint => address) private teachersByIndex;

    //Tutti gli aministratori
    uint private countAdministrators;
    mapping (address => bool) private administrators;
    mapping (uint => address) private administratorsByIndex;

    //Costruttore
    function University() public {
        universityAddress = msg.sender;
        registered[msg.sender] = true;
    }

    modifier onlyFounder {
        require(msg.sender == universityAddress || isAdmin(msg.sender));
        _;
    }

    modifier registrableAddress(address _address) {
        require(!registered[_address]);
        _;
    }

    modifier validAddress(address _address) {
        require(_address != 0);
        _;
    }

      // IN SOTTOCONTRATTI!
    //Per aggiungere uno studente.
    function newStudent(address studentAddress) public onlyFounder
    registrableAddress(studentAddress) validAddress(studentAddress) {
        registered[studentAddress] = true;
        students[studentAddress] = true;
        studentsByIndex[countStudents] = studentAddress;
        countStudents += 1;
    }

    //Per aggiungere uno docente.
    function newTeacher(address teacherAddress) public onlyFounder
    registrableAddress(teacherAddress) validAddress(teacherAddress) {
        registered[teacherAddress] = true;
        teachers[teacherAddress] = true;
        teachersByIndex[countStudents] = teacherAddress;
        countTeachers += 1;
    }

    //Per aggiungere un admin.
    function newAdmin(address adminAddress)  public onlyFounder
    registrableAddress(adminAddress) validAddress(adminAddress) {
        registered[adminAddress] = true;
        administrators[adminAddress] = true;
        administratorsByIndex[countStudents] = adminAddress;
        countAdministrators += 1;
    }

    //Function to check if an address is of the university creator
    function isUniversityFounder(address possibleUniversityAddress) public view returns(bool) {
        return possibleUniversityAddress == universityAddress;
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

      // IN SOTTOCONTRATTI!
    //Ritorna numero dei studenti
    function getStudentsNumber() public view returns(uint) {
        return countStudents;
    }

    //Ritorna numero dei docenti
    function getTeachersNumber() public view returns(uint) {
        return countTeachers;
    }

    //Ritorna numero dei admin
    function getAdminsNumber() public view returns(uint) {
        return countAdministrators;
    }

    //Ritorna l'admin indicato
    function getAdminAt(uint index) public view returns(address) {
        return administratorsByIndex[index];
    }

    /**
    return bool registered, true if already in the system users -> false if not
    */
    function alreadyRegistered(address _address) public view returns(bool registeredStatus) {
        registeredStatus = registered[_address];
    }

    function login() public view returns (uint typeUser) {
        typeUser = loginAddr(msg.sender);
    }

  /*
  NOTLOGGED: 0,
  UNIVERSITY: 1,
  ADMIN: 2,
  PROFESSOR: 3,
  STUDENT: 4,
  */
    function loginAddr(address userAddr) private view returns (uint typeUser) {
        typeUser = 0; //notRegistered

        if (isUniversityFounder(userAddr))
            typeUser = 1; //University

        if (isAdmin(userAddr))
            typeUser = 2; //Admin

        if (isTeacher(userAddr))
            typeUser = 3; //Professor

        if (isStudent(userAddr))
            typeUser = 4; //Student
    }
}
