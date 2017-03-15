import app from '../server';
import { Beef, Dinosaur, Govt } from '../models';

export function getResults(req, res, next) {	
	let findResults;
	const where = {
		identifiedError: null,
		identifiedConclusion: null,
	};
	if (req.query.data === 'beef') {
		findResults = Beef.findAll({ where: where });
	}
	if (req.query.data === 'dino') {
		findResults = Dinosaur.findAll({ where: where });
	}
	if (req.query.data === 'govt') {
		findResults = Govt.findAll({ where: where });
	}

	return findResults
	.then(function(results) {
		return res.status(201).json(results);
	})
	.catch(function(err) {
		console.error('Error in getResults: ', err);
		return res.status(500).json(err);
	});
}
app.get('/results', getResults);

export function putResult(req, res, next) {
	let updateResult;
	const where = {
		id: req.body.rowId,
	};
	const updates = {
		identifiedError: req.body.identifiedError,
		identifiedConclusion: req.body.identifiedConclusion,
	};

	if (req.body.data === 'beef') {
		updateResult = Beef.update(updates, { where: where });
	}
	if (req.body.data === 'dino') {
		updateResult = Dinosaur.update(updates, { where: where });
	}
	if (req.body.data === 'govt') {
		updateResult = Govt.update(updates, { where: where });
	}
	return updateResult
	.then(function(result) {
		return res.status(201).json(true);
	})
	.catch(function(err) {
		console.error('Error in putResult: ', err);
		return res.status(500).json(err);
	});
}
app.put('/results', putResult);
