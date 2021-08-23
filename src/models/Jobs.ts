import mongoose from 'mongoose';
const JobsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

const Jobs = mongoose.model('jobs', JobsSchema);
module.exports = Jobs;