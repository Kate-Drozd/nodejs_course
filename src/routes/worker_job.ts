import express, { Request, Response } from "express";
const { Router } = require('express');
const Worker_JobModel = require('../models/Worker_Job');
const router = Router(); 


router.post('/insert', async (req: Request, res: Response) => {
	const jobIDr = req.body.jobID;
	const workerIDr = req.body.workerID;
	const startDater= new Date();
	const hoursPerDayr =  req.body.hoursPerDay;
	const salaryr = req.body.salary;

	Worker_JobModel.aggregate([
	      {
	        $group: {
	        	_id:  "$workerID",
	          'hours': {
	            $sum: "$hoursPerDay"
	          }
	        }
	      },
	      
	   ])
	    .exec( async(err: string, sum: any) => {
	      if (err) {
	        res.send(err);
	      } else {

			  let total_hours = sum.find((item: { _id: string, hours:string })  => item._id == workerIDr);
	      	if ((parseInt(total_hours.hours) + hoursPerDayr)  < 20) {
	      		const worker_job = new Worker_JobModel({
					workerID: workerIDr,
					jobID: jobIDr,
					startDate: Date.now(),
					hoursPerDay: hoursPerDayr,
					salary: salaryr,
				})
				try{
					await worker_job.save();
					res.send('inserted data');
				} catch(err){
					console.log(err);
				}
		    } else {
		    	console.log('It is forbidden to work > 20 hours per day')
		    }
	      	
	      }
	    })
});

router.get('/insertWorker_Job1', async (req: Request, res: Response) => {
	const worker_job = new Worker_JobModel({
		workerID: '611f054705934c12f484de5a',
		jobID: '611f23dfdce37f0a78a7a6a9',
		startDate: Date.now(),
		hoursPerDay: 7,
		salary: 500,
	})
	try{
		await worker_job.save();
		res.send('inserted data');
	} catch(err){
		console.log(err);
	}
});

router.get('/insertWorker_Job2', async (req: Request, res: Response) => {
const worker_job2 = new Worker_JobModel({
		workerID: '611f054705934c12f484de5a',
		jobID: '612121479fbc8237d86bc172',
		startDate: Date.now(),
		hoursPerDay: 3,
		salary: 200,
	})
	try{
		await worker_job2.save();
		res.send('inserted data');
	} catch(err){
		console.log(err);
	}
});

router.get('/insertWorker_Job3', async (req: Request, res: Response) => {
const worker_job2 = new Worker_JobModel({
		workerID: '612120e35b403a3d30c6c5e7',
		jobID: '612121479fbc8237d86bc172',
		startDate: Date.now(),
		hoursPerDay: 3,
		salary: 200,
	})
	try{
		await worker_job2.save();
		res.send('inserted data');
	} catch(err){
		console.log(err);
	}
});



router.get('/statsWorker/:id', async (req: Request, res: Response) =>{
 	const wID = req.params.id;
 	Worker_JobModel.find({'workerID' : wID}, {'_id':0, '__v':0 }, (err: any,result: any) => {
		if (err) {
			res.send(err)
		}
		Worker_JobModel.aggregate(
		    [
		      {
		        $group: {
		        	_id: "$workerID",
		          'total salary for given workerID': {
		            $sum: "$salary"
		          }
		        }
		      }
		    ],
		    function(err: any, sum: any) {
		      if (err) {
		        res.send(err);
		      } else {
				  let total_Salary_for_worker = sum.find((item: { _id: string}) => item._id == wID);
		        res.send({result, total_Salary_for_worker});
		      }
		    }
		  );
	})
 });

router.get('/statsJob/:id', async (req: Request, res: Response) =>{
 	const jID = req.params.id;
 	Worker_JobModel.find({'jobID' : jID}, {'_id':0, '__v':0 }, (err: any,result: any) => {
		if (err) {
			res.send(err)
		}
		Worker_JobModel.aggregate([

		      // { $match: { 'jobID': jID}},
		      {
		        $group: {
		        	_id:  "$jobID",
		          'total salary for given jobID': {
		            $sum: "$salary"
		          }
		        }
		      },
		      
		   ])
		    .exec((err:any, sum:any) => {
		      if (err) {
		        res.send(err);
		      } else {
				  let total_Salary_for_job = sum.find((item: { _id: string }) => item._id == jID);
		      
		        res.send({result, total_Salary_for_job});
		      }
		    })
		 
	});
 });

router.delete('/delete/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	await Worker_JobModel.findByIdAndRemove(id).exec();
	res.send('deleted');
})

module.exports = router;