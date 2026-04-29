import { Test, TestingModule } from '@nestjs/testing';
import { IncluyeController } from './incluye.controller';
import { IncluyeService } from './incluye.service';

describe('IncluyeController', () => {
  let controller: IncluyeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncluyeController],
      providers: [IncluyeService],
    }).compile();

    controller = module.get<IncluyeController>(IncluyeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
