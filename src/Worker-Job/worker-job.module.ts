import {MongooseModule} from "@nestjs/mongoose";
import {Module} from "@nestjs/common";
import {WorkerJob, WorkerJobSchema} from "./schemas/worker-job.schema";
import {WorkerJobService} from "./worker-job.service";
import {WorkerJobController} from "./worker-job.controller";


@Module({
    providers:[WorkerJobService],
    controllers:[WorkerJobController],
    imports: [
        MongooseModule.forFeature([
            {name: WorkerJob.name, schema: WorkerJobSchema}
        ])
    ]
})
export class WorkerJobModule {

}