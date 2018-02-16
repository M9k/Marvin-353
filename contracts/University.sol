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

    //Primo indirizzo è quello dell'utente e il secondo del contrato.
    mapping (address => address) private contracts;


    //Utenti in attsa di conferma
    mapping (address => address) private pending;

    //Costruttore
    function newUniversity() public  {
        universityAddress=msg.sender;
    }

    //Modificatori
    modifier onlyUniversity {
        require(msg.sender==universityAddress);
        _;
    }

    modifier onlyStudents{
        require(isStudent(msg.sender));
        _;
    }

    modifier onlyAdmin{
        require(isAdmin(msg.sender));
        _;
    }

    modifier onlyTeacher{
        require(isTeacher(msg.sender));
        _;
    }

    //Funzione di login: ritorna l'indiritzzo di un contratto presente sulla blockchain associato all'utente(se esiste) che sta facendo il login tramite metamask
    //Ritorno l'indirizzo del contratto cosi tramite quel indirizzo riesce a comminicare con il contratto(quando si è iscritto al universita) e fare le operazione fornite.
    function login() public view onlyAdmin onlyTeacher onlyStudents returns(address){
        return contracts[msg.sender];
    }


    //Un utente(strudente, docente...) fa la richiesta e viene aggiunto nella lista pending, successivamente universita oppure admin danno al conferma
    function request(address userAddress, address contractAddress) public {
        if(userAddress!=0 && contractAddress !=0){
            pending[userAddress]=contractAddress;
        }
    }

    //Un admin conferma ed aggiunge uno studente e lo rimuove dalla lista pending
    function newStudent(address studentAddress) onlyUniversity onlyAdmin public {
        if(!isStudent(studentAddress)){
            students[studentAddress]= true;
            contracts[studentAddress]= pending[studentAddress];
            delete pending[studentAddress];
        }
    }

    //Per aggiungere uno docente.
    function newTeacher(address teacherAddress) onlyUniversity onlyAdmin public {
        if(!isTeacher(teacherAddress)){
            teachers[teacherAddress]= true;
            contracts[teacherAddress]= pending[teacherAddress];
            delete pending[teacherAddress];
        }
    }

    //Per aggiungere un admin.
    function newAdmin(address adminAddress) onlyUniversity onlyAdmin public {
        if(!isAdmin(adminAddress)){
            students[adminAddress]= true;
            contracts[adminAddress]= pending[adminAddress];
            delete pending[adminAddress];
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

    function getNumStudent() public view returns(uint){
        return countStudents;
    }

}
