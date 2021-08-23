import express, { Request, Response } from "express";
import { Schema, model, connect } from 'mongoose';
const { Router } = require('express');
const WorkersModel = require('../models/Workers');
const router = Router();


router.get('/insertWorker1', async (req: Request, res: Response) => {
	const worker = new WorkersModel({
		firstName: 'Kate',
		lastName: 'Dudorga'
	})
	try{
		await worker.save();
		res.send('inserted data');
	} catch(err){
		console.log(err);
	}
});	

router.get('/insertWorker2', async (req: Request, res: Response) => {
	const worker2 = new WorkersModel({
		firstName: 'Tom',
		lastName: 'Soyer'
	})
	try{
		await worker2.save();
		res.send('inserted data');
	} catch(err){
		console.log(err);
	}
});

router.get("/read", async (req: Request, res: Response) => {
	WorkersModel.find({}, (err: String,result: any) => {
		if (err) {
			res.send(err)
		}

		res.send(result);
	})
});

router.put('/update', async (req: Request, res: Response) => {
	const fName = req.body.firstName;
	const lName = req.body.lastName;
	const id = req.body.id;

	try{
		await WorkersModel.findById(id, (err: string, updatedWorker: any) =>{
			updatedWorker.firstName = fName;
			updatedWorker.lastName = lName;
			updatedWorker.save();
			res.send("updated");
		});
		
	} catch(err){
		console.log(err);
	}
});

router.delete('/delete/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	await WorkersModel.findByIdAndRemove(id).exec();
	res.send('deleted');
})

module.exports = router;