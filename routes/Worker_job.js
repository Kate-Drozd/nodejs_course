const express = require("express");
const router = express.Router();
const { Worker_job, Workers, Jobs } = require("../models");
const db = require("../models");


/*Worker_job.create({
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
  }).catch(err=>console.log(err));*/


router.get("/StatsForWorker/:workerID", function(req, res){
    const id = req.params.workerID;
     Jobs.findAll({
      
      include: [{
        model: Workers,
        through: {
          model: Worker_job,
          attributes: ['hoursPerDay', 'salary', 'startDate'], 
          where: {workerID : id}
        }
      }],
     attributes: [
     'name'
     ],
      raw: true   
    }).then(data => {
      Worker_job.findAll({
        where: {workerID: id},
        attributes:[[db.sequelize.fn('SUM', db.sequelize.col('salary')), 'Общая ЗП по всем работам']]
      }).then(sum =>{
        res.send({data, sum})
      }) 
        
    });
});

router.get("/StatsForJob/:jobID", function(req, res){
    const id = req.params.jobID;
     Workers.findAll({
      
      include: [{
        model: Jobs,
        through: {
          model: Worker_job,
          attributes: ['hoursPerDay', 'salary', 'startDate'], 
          where: {jobID : id}
        }
      }],
     attributes: [
     'firstName',
     'lastName'
     ],
      raw: true   
    }).then(data => {
      Worker_job.findAll({
        where: {jobID: id},
        attributes:[[db.sequelize.fn('SUM', db.sequelize.col('salary')), 'Общая ЗП по всем работам']]
      }).then(sum =>{
        res.send({data, sum})
      }) 
        
    });
});

router.post('/insert', function(req,res){
      const jobIDr = req.body.jobID;
      const workerIDr = req.body.workerID;
      const startDater= new Date();
      const hoursPerDayr =  req.body.hoursPerDay;
      const salaryr = req.body.salary;

      Worker_job.findAll({
        where : {workerID : workerIDr},
        attributes:[[db.sequelize.fn('SUM', db.sequelize.col('hoursPerDay')), 'hoursSum']]
      }).then(hours =>{
        const result = JSON.parse( JSON.stringify(hours, null, 4) );
         console.log(hoursPerDayr + parseInt(result[0].hoursSum));
        if ((parseInt(result[0].hoursSum) + hoursPerDayr)  < 21) {
          Worker_job.create({
            jobID : jobIDr,
            workerID: workerIDr,
            startDate: startDater,
            hoursPerDay: hoursPerDayr,
            salary: salaryr
          }).then(res=>{
            console.log(res);
          }).catch(err=>console.log(err));
        } else {
          console.log('нельзя работать > 20 часов  сутки!')
        }
      }).catch(err=>console.log(err));
   
});

router.delete('/delete/:recordID', function(req,res){
  const id =  req.params.recordID
  Worker_job.destroy({
  where: {
    recordID: id
  }
}).then((res) => {
  console.log(res);
});
})

router.get("/", async (req, res) => {
  const listOfWorker_job = await Worker_job.findAll();
  res.send(listOfWorker_job);
});


module.exports = router;