import mturk from 'mturk-api';
import app from '../server';
import { mturkConfig, Dinosaur } from '../models';

export function getDinosaur(req, res, next) {	
	return Dinosaur.count({
		where: {
			workerId: req.query.workerId
		}
	})
	.then(function(count) {
		return res.status(201).json(count === 0);
	})
	.catch(function(err) {
		console.error('Error in getDino: ', err);
		return res.status(500).json(err);
	});
}
app.get('/dino', getDinosaur);

export function postDinosaur(req, res, next) {	
	return mturk.createClient(mturkConfig)
	.then(function(mturkClient) {
		return mturkClient.req('ApproveAssignment', { AssignmentId: req.body.assignmentId });	
	})
	.then(function(amazonResponse) {
		return Dinosaur.create({
			mode: req.body.mode,
			reviewContent: req.body.reviewContent,
			reviewRating: req.body.reviewRating,
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
		});
	})
	.then(function(result) {
		return res.status(201).json(true);
	})
	.catch(function(err) {
		console.error('Error in postDino: ', err);
		return res.status(500).json(err);
	});
}
app.post('/dino', postDinosaur);
