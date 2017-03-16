import app from '../server';
import { Beef } from '../models';

export function getBeef(req, res, next) {	
	return Beef.count({
		where: {
			workerId: req.query.workerId
		}
	})
	.then(function(count) {
		return res.status(201).json(count === 0);
	})
	.catch(function(err) {
		console.error('Error in getBeef: ', err);
		return res.status(500).json(err);
	});
}
app.get('/beef', getBeef);

export function postBeef(req, res, next) {
	return Beef.create({
		mode: req.body.mode,
		reviewContent: req.body.reviewContent,
		reviewRating: req.body.reviewRating,
		offsetValues: req.body.offsetValues,
		offsetInteractions: req.body.offsetInteractions,
		timeOnReview: req.body.timeOnReview,
		timeWriting: req.body.timeWriting,
		scrollValues: req.body.scrollValues,
		levelOfEducation: req.body.levelOfEducation,
		isScientist: req.body.isScientist,
		hasReviewed: req.body.hasReviewed,
		hasBeenReviewed: req.body.hasBeenReviewed,
		interestedInTopic: req.body.interestedInTopic,
		feedback: req.body.feedback,
		usedInterface: req.body.usedInterface,
		workerId: req.body.workerId,
		assignmentId: req.body.assignmentId,
		hitId: req.body.hitId,
	})
	.then(function(result) {
		return res.status(201).json(true);
	})
	.catch(function(err) {
		console.error('Error in postBeef: ', err);
		return res.status(500).json(err);
	});
}
app.post('/beef', postBeef);
