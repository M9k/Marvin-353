//const fs = require('file-system');
//const solc = require('solc');
/* Solc da problemi con webpack siccome ha come dipendenza require-from-string alla versione
1.1.0 che rompe webpack*/
class W3ContractABI {
  construct(path){
    this.path = path;
    this.abi = null;
    this.bytecode = null;
  }
  load(){
    let source = fs.readFileSync(this.path, 'utf8');
    let compiledContract = solc.compile(source, 1);
    this.abi = compiledContract.contracts[this.path.split('/')[-1].split('.')[0]].interface;
    this.bytecode = compiledContract.contracts[this.path.split('/')[-1].split('.')[0]].bytecode;
  }
  get(){
    if(this.abi == null){
      this.load();
    }
    return this.abi;
  }
  bytecode(){
    if(this.bytecode = null){
      this.load();
    }
    return this.bytecode;
  }
}
export default W3ContractABI;
