import { Test, TestingModule } from '@nestjs/testing';
import { WorkerJobService } from './worker-job.service';

describe('WorkerJobService', () => {
  let service: WorkerJobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerJobService],
    }).compile();

    service = module.get<WorkerJobService>(WorkerJobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
