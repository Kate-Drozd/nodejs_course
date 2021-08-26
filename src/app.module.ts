import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {MongooseModule} from "@nestjs/mongoose";
import { AppService } from './app.service';
import {WorkersModule} from "./workers/workers.module";
import {JobsModule} from "./jobs/jobs.module";
import { WorkerJobModule } from './worker-job/worker-job.module';


@Module({
  imports: [
      WorkersModule,
      JobsModule,
      MongooseModule.forRoot("<YourURI>"),
      WorkerJobModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
