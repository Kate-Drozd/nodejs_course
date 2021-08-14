const Sequelize = require("sequelize");
const {workers} = require('./models/workers.js');
const jobs = require('./models/jobs.js');
const worker_job = require('./models/worker_job.js');

const sequelize = new Sequelize("work2", "root", "3123", {
	dialect: "mysql",
	host: "localhost",
	define: {
	timestamps: false
	}
});
	const workersTable = workers(sequelize);
	const jobsTable = jobs(sequelize);
	const worker_jobTable = worker_job(sequelize);
	 workersTable.belongsToMany(jobsTable, {through: worker_jobTable});
	jobsTable.belongsToMany(workersTable, {through: worker_jobTable});

	sequelize.sync({ force: true }).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    });

module.exports = {
	sequelize : sequelize,
	workers : workersTable,
	jobs: jobsTable,
	worker_job: worker_jobTable 
}
	

		 
		
