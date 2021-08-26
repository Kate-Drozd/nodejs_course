import { Test, TestingModule } from '@nestjs/testing';
import { WorkerJobController } from './worker-job.controller';

describe('WorkerJobController', () => {
  let controller: WorkerJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkerJobController],
    }).compile();

    controller = module.get<WorkerJobController>(WorkerJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
