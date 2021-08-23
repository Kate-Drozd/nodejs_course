import mongoose from 'mongoose';
const WorkersSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
});

const Workers = mongoose.model('workers', WorkersSchema);
module.exports = Workers;