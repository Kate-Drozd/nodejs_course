import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Date, Document} from 'mongoose';
import * as mongoose from 'mongoose';
import { Workers } from '../../workers/schemas/workers.schema';
import { Jobs } from '../../jobs/schemas/jobs.schema';



export type WorkerJobDocument = WorkerJob & Document
@Schema()
export class WorkerJob {
    @Prop({ required: true,  type: mongoose.Schema.Types.ObjectId, ref: 'Workers' })
    workerID: string
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Jobs' })
    jobID: string
    @Prop({ required: true,type: Date, default: Date.now })
    startDate: Date
    @Prop({ required: true })
    hoursPerDay: number
    @Prop({ required: true })
    salary: number
}

export const WorkerJobSchema = SchemaFactory.createForClass(WorkerJob)