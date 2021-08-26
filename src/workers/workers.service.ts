import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose'
import {CreateWorkerDto} from "./dto/create-worker.dto";
import {Workers, WorkersDocument} from "./schemas/workers.schema";
import {UpdateWorkerDto} from "./dto/update-worker.dto";


@Injectable()
export class WorkersService {
    constructor(@InjectModel(Workers.name)private WorkerModel: Model<WorkersDocument>){

    }
    async getAll(): Promise<Workers[]>{
        return this.WorkerModel.find().exec()
    }
    async getById(id:string): Promise<Workers>{
        return this.WorkerModel.findById(id)
    }
    async create(WorkersDto:CreateWorkerDto): Promise<Workers>{
        const newWorker = new this.WorkerModel(WorkersDto)
        return newWorker.save()
    }
    async remove(id:string): Promise<Workers>{
        return this.WorkerModel.findByIdAndRemove(id)
    }
    async update(id:string, workersDto: UpdateWorkerDto):Promise<Workers>{
        return this.WorkerModel.findByIdAndUpdate(id, workersDto, {new:true})
    }
}
