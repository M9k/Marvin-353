import fs from 'fs';
import { infoString, errorString, successString } from './helpers/colors';

const deleteDuck = name => {
  const path = `src/ducks/${name}.js`;
  if(fs.existsSync(path)) fs.unlinkSync(path);
  return path;
};
const deleteSaga = name => {
  const path = `src/sagas/${name}Saga.js`;
  if(fs.existsSync(path)) fs.unlinkSync(path);
  return path;
};
const deleteIntegration = name => {
  const path = `testnpm/integration/redux/${name}.js`;
  if(fs.existsSync(path)) fs.unlinkSync(path);
  return path;
};
const updateSagas = name => {
  const aggregator_path = 'src/sagas.js';
  let aggr = fs.readFileSync(aggregator_path, { encoding: 'utf8' });
  aggr = aggr.replace(`import ${name} from './sagas/${name}Saga';\n\n`, '');
  aggr = aggr.replace(`  fork(${name}),\n  `, '');
  fs.writeFileSync(aggregator_path, aggr, { flag: 'w' });
  return aggregator_path;
};
let name = process.argv[2];
name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
console.log(`deleted: ${errorString(deleteDuck(name))}`);
console.log(`deleted: ${errorString(deleteSaga(name))}`);
console.log(`deleted: ${errorString(deleteIntegration(name))}`);
console.log(`updated: ${infoString(updateSagas(name))}`);
