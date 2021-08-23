import express from 'express';
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
app.use(express.json());
app.use(cors());
const workersRoutes = require('./routes/workers');
const jobsRoutes = require('./routes/jobs');
const worker_jobRoutes = require('./routes/worker_job');
app.use("/workers/", workersRoutes);
app.use("/jobs/", jobsRoutes);
app.use("/worker_job/", worker_jobRoutes);

mongoose.connect('<YOUR LINK HERE>', {
	useNewUrlParser: true,
});


app.listen(3001, (): void  => {
	console.log("Server is running on port 3001...");
})