const express = require("express");
const router = express.Router();
const { Worker_job, Workers, Jobs } = require("../models");
const db = require("../models");


Worker_job.create({
    workerID: 1,
    jobID: 1,
    startDate: new Date(),
    hoursPerDay: 4,
    salary: 250
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));

  Worker_job.create({
    workerID: 1,
    jobID: 2,
    startDate: new Date(),
    hoursPerDay: 6,
    salary: 400
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));

  Worker_job.create({
    workerID: 2,
    jobID: 2,
    startDate: new Date(),
    hoursPerDay: 16,
    salary: 1000
  }).then(res=>{
    console.log(res);
  }).catch(err=>console.log(err));


router.get("/api/getStatsForWorker/:workerID", function(req, res){
    const id = req.params.workerID;
  //const sqlSelect = "select jobs.name, worker_job.startDate, worker_job.salary, if (@i:=@i+1 < 2, (select sum(salary) 
  //from worker_job where workerID = ?), null) as 'Общая ЗП по всем работам' from worker_job join (select @i:=0) as c 
  //join jobs on worker_job.jobID = jobs.jobID where workerID = ? " ; 
     Worker_job.findAll({
      where: {workerID : id},
      attributes: [
      'startDate',
      'salary',     
      [db.sequelize.fn('SUM', db.sequelize.col('salary')), 'Общая ЗП по всем работам']
    ],
      include: [
        {
          model: Workers,
          attributes:['firstName', 'lastName'],
          where : {workerID: {$col: 'Worker_job.workerID'}}
                    
        },
        {
          model: Jobs,

          attributes:'name',
          where:{ jobID: {$col: 'Worker_job.jobID'}}
        }
      ],
      raw: true

      
    }).then(data => {
    
      res.send(data)
    });
});

router.get("/", async (req, res) => {
  const listOfWorker_job = await Worker_job.findAll();
  res.send(listOfWorker_job);
});


module.exports = router;