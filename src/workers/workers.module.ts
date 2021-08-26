import {Module} from "@nestjs/common";
import {WorkersService} from "./workers.service";
import {WorkersController} from "./workers.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Workers, WorkersSchema} from "./schemas/workers.schema";

@Module({
   providers:[WorkersService],
    controllers:[WorkersController],
    imports: [
        MongooseModule.forFeature([
            {name: Workers.name, schema: WorkersSchema}
        ])
    ]
})
export class WorkersModule {
    
}