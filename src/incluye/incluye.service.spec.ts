import { Test, TestingModule } from '@nestjs/testing';
import { IncluyeService } from './incluye.service';

describe('IncluyeService', () => {
  let service: IncluyeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncluyeService],
    }).compile();

    service = module.get<IncluyeService>(IncluyeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
