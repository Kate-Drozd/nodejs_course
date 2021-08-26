import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Error, Model, ObjectId, Schema, Types} from 'mongoose'
import {WorkerJob, WorkerJobDocument} from "./schemas/worker-job.schema";
import {CreateWorkerJobDto} from "./dto/create-workerJob.dto";
import {isEmpty} from "@nestjs/common/utils/shared.utils";
import {JSONFile} from "@nestjs/schematics/dist/utils/json-file.util";
import {Response} from "express";
import {Workers} from "../workers/schemas/workers.schema";





@Injectable()
export class WorkerJobService {
    constructor(@InjectModel(WorkerJob.name)private WorkerJobModel: Model<WorkerJobDocument>){

    }
    async getAll(): Promise<WorkerJob[]>{
        return this.WorkerJobModel.find().exec()
    }
    async create(WorkerJobdto:CreateWorkerJobDto): Promise<WorkerJob>{
        const newWorkerJob = new this.WorkerJobModel(WorkerJobdto);
        const workerID = newWorkerJob.workerID;

        const hoursQuery = this.WorkerJobModel.aggregate([
            {
                $match:{
                    workerID: workerID
                }
            },
            {
                $group: {
                    _id:  "$workerID",
                    'hours': {
                        $sum: "$hoursPerDay"
                    }
                }
            }
        ]).exec();
        const hoursSum = await hoursQuery;
        if (isEmpty(hoursSum)) { return newWorkerJob.save();}
        else if ( ((parseInt(hoursSum[0].hours)+ newWorkerJob.hoursPerDay) < 20)){
            return newWorkerJob.save();
        } else {
            throw new Error("It is forbidden to work greater then 20 hours per day")
        }
    }
     async getStatsWorker(id: string){
         const sumQuery = this.WorkerJobModel.aggregate([
             {
                 $match:{
                     workerID: Types.ObjectId(id)
                 }
             },
             {
                 $group: {
                     _id:  "$workerID",
                     'salaryTotal': {
                         $sum: "$salary"
                     }
                 }
             }
         ]).exec();
         const salarySum = await sumQuery;
         const findReq = await this.WorkerJobModel.find({'workerID' : id}, {'_id':0, '__v':0 }).exec()
        return ({findReq, salarySum});
    }
    async getStatsJob(id: string){
        const sumQuery = this.WorkerJobModel.aggregate([
            {
                $match:{
                    jobID: Types.ObjectId(id)
                }
            },
            {
                $group: {
                    _id:  "$jobID",
                    'salaryTotal': {
                        $sum: "$salary"
                    }
                }
            }
        ]).exec();
        const salarySum = await sumQuery;
        const findReq = await this.WorkerJobModel.find({'jobID' : id}, {'_id':0, '__v':0 }).exec()
        return ({findReq, salarySum});
    }
    async remove(id:string): Promise<WorkerJob>{
        return this.WorkerJobModel.findByIdAndRemove(id)
    }
}