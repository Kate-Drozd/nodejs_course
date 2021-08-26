import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {JobsService} from "./jobs.service";
import {Jobs} from "./schemas/jobs.schema";
import {CreateJobDto} from "./dto/create-job.dto";

@Controller('jobs')
export class JobsController {
    constructor(private readonly JobsService: JobsService) {

    }

    @Get()
    getAll(): Promise<Jobs[]> {
        return this.JobsService.getAll()
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() CreateJobDto: CreateJobDto) {
        return this.JobsService.create(CreateJobDto)
    }

}