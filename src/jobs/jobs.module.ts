import {MongooseModule} from "@nestjs/mongoose";
import {Module} from "@nestjs/common";
import {Jobs, JobsSchema} from "./schemas/jobs.schema";
import {JobsService} from "./jobs.service";
import {JobsController} from "./jobs.controller";


@Module({
    providers:[JobsService],
    controllers:[JobsController],
    imports: [
        MongooseModule.forFeature([
            {name: Jobs.name, schema: JobsSchema}
        ])
    ]
})
export class JobsModule {

}