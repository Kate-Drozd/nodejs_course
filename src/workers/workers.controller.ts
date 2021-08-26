import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {CreateWorkerDto} from "./dto/create-worker.dto";
import {UpdateWorkerDto} from "./dto/update-worker.dto";
import {WorkersService} from "./workers.service";
import {Workers} from "./schemas/workers.schema";

@Controller('workers')
export class WorkersController {
    constructor(private readonly WorkerService: WorkersService){

    }

    @Get()
    getAll():Promise<Workers[]>{
        return this.WorkerService.getAll()
    }
    @Get( ':id')
    getOne(@Param('id') id: string):Promise<Workers>{
        return this.WorkerService.getById(id)
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() CreateWorkerDto: CreateWorkerDto) {
        return this.WorkerService.create(CreateWorkerDto)
    }

    @Delete(':id')
    remove(@Param('id')id: string):Promise<Workers>{
        return this.WorkerService.remove(id)
    }
    @Put(':id')
    update(@Param('id')id:string, @Body() updateWorkerDto: UpdateWorkerDto ):Promise<Workers>{
        return this.WorkerService.update(id, updateWorkerDto)
    }
}
