import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {WorkerJobService} from "./worker-job.service";
import {WorkerJob} from "./schemas/worker-job.schema";
import {CreateWorkerJobDto} from "./dto/create-workerJob.dto";
import {Workers} from "../workers/schemas/workers.schema";

@Controller('worker-job')
export class WorkerJobController {
    constructor(private readonly WorkerJobService: WorkerJobService) {

    }

    @Get()
    getAll(): Promise<WorkerJob[]> {
        return this.WorkerJobService.getAll()
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() CreateWorkerJobDto: CreateWorkerJobDto) {
        return this.WorkerJobService.create(CreateWorkerJobDto)
    }
    @Get( '/statsWorker/:id')
    getStatsWorker(@Param('id') id: string){

        return this.WorkerJobService.getStatsWorker(id)
    }
    @Get( '/statsJob/:id')
    getStatsJob(@Param('id') id: string){
        return this.WorkerJobService.getStatsJob(id)
    }
    @Delete(':id')
    remove(@Param('id')id: string):Promise<WorkerJob>{
        return this.WorkerJobService.remove(id)
    }



}
