import Promise from 'bluebird';
import fs from 'fs';
import { sequelize, Dinosaur, Govt, Beef } from '../models';

const fsWriteFile = Promise.promisify(fs.writeFile);

sequelize.sync({ force: false })
.then(function() {
	return Dinosaur.findAll({ raw: true });
})
.then(function(dinoData) {
	return fsWriteFile('./data/dinoData.js', 'export default ' + JSON.stringify(dinoData, null, 2), 'utf-8');
})
.then(function() {
	console.log('Finished Exporting Dino Data');
	return Govt.findAll({ raw: true });
})
.then(function(govtData) {
	return fsWriteFile('./data/govtData.js', 'export default ' + JSON.stringify(govtData, null, 2), 'utf-8');
})
.then(function() {
	console.log('Finished Exporting Govt Data');
	return Beef.findAll({ raw: true });
})
.then(function(beefData) {
	return fsWriteFile('./data/beefData.js', 'export default ' + JSON.stringify(beefData, null, 2), 'utf-8');
})
.then(function(result) {
	console.log('Finished Exporting Beef Data');
	process.exit();	
})
.catch(function(err) {
	console.log(err);
	process.exit();	
});
