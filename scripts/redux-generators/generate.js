import fs from 'fs';
const makeDuck = name => {
  let tpl = fs.readFileSync('scripts/redux-generators/templates/duck.tpl', {encoding: 'UTF-8'});
  const duck = tpl.replace(/--Name--/g, name);
  fs.writeFileSync(`src/ducks/${name}.js`, duck);
};
const makeSaga = name => {

};
const updateReducers = name => {


}
const updateSagas = name => {

}
const printHelp = () =>{
console.log(`
babel-node generate.js TYPE NAME [options] \n
TYPE [duck, saga] => what file do you want to generate (specifying saga also the duck will be generated)
NAME => the name of your new module (it will append Duck/Saga)
\n\n
options:
--no-update => the generator won't update the aggregators
--help => print this help
`);
}
const args = process.argv.slice(2, 4);
const options = process.argv.slice(4);
if(process.argv.includes("--help")) {
  printHelp();
  process.exit();
}
if(args.length < 2){
  console.log("You must provide at least 2 arguments!")
  printHelp();
  process.exit(1);
}
const type = args[0].toLowerCase();
const name = `${args[1].charAt(0).toUpperCase()}${args[1].slice(1)}`;
switch(type){
  case('saga'):
    console.log("making saga");
  case('duck'):
    makeDuck(name);
    break;
  default:
    console.log(`${type} as type is not permitted!`);
    printHelp();
    process.exit(1);
}
process.exit();
