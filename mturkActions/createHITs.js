import AWS from 'aws-sdk';
// import xmlescape from 'xml-escape';
require('../config.js');
const sandbox = true;
const experimentType = 'dino';
let title;
if (experimentType === 'dino') { 
	title = 'Review a Scientific Paper on Dinosaurs';
}
if (experimentType === 'govt') { 
	title = 'Review a Scientific Paper on Politics';
}
if (experimentType === 'beef') { 
	title = 'Review a Scientific Paper on Diet';
}

const credentials = new AWS.Credentials({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

AWS.config.update({
	credentials: credentials,
	apiVersion: '2017-01-17',
	region: 'us-east-1',
	sslEnabled: 'true',
});

const experimentURL = sandbox 
	? `https://dev-experiments.pubpub.org/${experimentType}` 
	: `https://experiments.pubpub.org/${experimentType}`;

const endpoint = sandbox 
	? 'https://mturk-requester-sandbox.us-east-1.amazonaws.com'
	: 'https://mturk-requester.us-east-1.amazonaws.com';

const mturk = new AWS.MTurk({ endpoint: endpoint });

const xmlQuestion = `<ExternalQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2006-07-14/ExternalQuestion.xsd">
  <ExternalURL>${experimentURL}</ExternalURL>
  <FrameHeight>600</FrameHeight>
</ExternalQuestion>`;


const params = {
	Title: title,
	Description: 'Provide critique on the logic and conclusions of a scientific paper. Identify any errors that exist.',
	Question: xmlQuestion, // IMPORTANT: XML NEEDS TO BE ESCAPED! 
	AssignmentDurationInSeconds: 3600, // Allow 60 minutes to answer 
	AutoApprovalDelayInSeconds: 86400 * 1, // 1 day auto approve 
	MaxAssignments: 225, // 1 worker responses 
	LifetimeInSeconds: 86400 * 1, // Expire in 1 days 
	Reward: '0.75',
	Keywords: 'Science Review',
	QualificationRequirements: [
		{
			QualificationTypeId: '00000000000000000071',
			Comparator: 'EqualTo',
			LocaleValues: [{
				Country: 'US',
			}]
		},
		{
			QualificationTypeId: '000000000000000000L0', // Percent Approved
			Comparator: 'GreaterThanOrEqualTo',
			IntegerValues: [90]
		},
		{
			QualificationTypeId: '00000000000000000040', // Percent Approved
			Comparator: 'GreaterThanOrEqualTo',
			IntegerValues: [500]
		}
	]
};

mturk.createHIT(params, function(err, data) {
	if (err) console.log('We have an Error ', err, err.stack); // an error occurred
	else console.log(data); // successful response
});

// mturk.listHITs({}, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(JSON.stringify(data, null, 2));           // successful response
// });
