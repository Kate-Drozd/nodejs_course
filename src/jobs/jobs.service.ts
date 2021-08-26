import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose'
import {Jobs, JobsDocument} from "./schemas/jobs.schema";
import {CreateJobDto} from "./dto/create-job.dto";



@Injectable()
export class JobsService {
    constructor(@InjectModel(Jobs.name)private JobsModel: Model<JobsDocument>){

    }
    async getAll(): Promise<Jobs[]>{
        return this.JobsModel.find().exec()
    }
    async create(JobsDto:CreateJobDto): Promise<Jobs>{
        const newJob = new this.JobsModel(JobsDto)
        return newJob.save()
    }
}
