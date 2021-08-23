import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Worker_JobSchema = new mongoose.Schema({
	workerID: {
		type: Schema.Types.ObjectId,
		ref: 'Workers',
		required: true,
	},
	jobID: {
		type: Schema.Types.ObjectId,
		ref: 'Jobs',
		required: true,
	},
	startDate:{
		type: Date, default: Date.now,
		required: true,
	},
	hoursPerDay:{
		type:Number,
		required: true,
	},
	salary:{
		type:Number,
		required: true,
	},


});

const Worker_Job = mongoose.model('worker_job', Worker_JobSchema);
module.exports = Worker_Job;