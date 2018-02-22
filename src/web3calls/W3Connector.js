import getWeb3 from "../util/web3/getWeb3";
//import W3ContractABI from "./W3ContractABI";
class W3Connector{};
W3Connector.contracts = {};
W3Connector.setContracts = function(){
  /*let cPath = [
    {University: "../../contracts/University.sol"}
  ];
  Object.keys(cPath).forEach((key) => {
    W3Connector.contracts[key] = new W3ContractABI(cPath[key]);
  });
  */
  W3Connector.contracts['University'] = [{"constant":false,"inputs":[{"name":"studentAddress","type":"address"}],"name":"newStudent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"adminAddress","type":"address"}],"name":"isAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"possibleUniversityAddress","type":"address"}],"name":"isUniversityFounder","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countStudents","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"studentAddress","type":"address"}],"name":"isStudent","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countAdministrators","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"adminAddress","type":"address"}],"name":"newAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"teacherAddress","type":"address"}],"name":"isTeacher","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"teacherAddress","type":"address"}],"name":"newTeacher","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"login","outputs":[{"name":"typeUser","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countTeachers","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAdminsNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getStudentsNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTeachersNumber","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
};
W3Connector.getContractABI = function(key){
  if(W3Connector.contracts[key] !== null && W3Connector.contracts[key] !== undefined )
    return W3Connector.contracts[key];
};
W3Connector.setContracts();
export default W3Connector;
