import express, { Request, Response } from"express";
const { Router } = require('express');
const JobsModel = require('../models/Jobs');
const router = Router();

router.get('/insertJob1', async (req: Request,res:Response)  => {
	const job = new JobsModel({
		name: 'LeverX'
	})
	try{
		await job.save();
		res.send('inserted data');
	} catch(err){
		console.log(err);
	}
});
router.get('/insertJob2', async (req: Request, res: Response) => {
	const job = new JobsModel({
		name: 'Google'
	})
	try{
		await job.save();
		res.send('inserted data');
	} catch(err){
		console.log(err);
	}
});

module.exports = router;