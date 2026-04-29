import { Module } from '@nestjs/common';
import { IncluyeService } from './incluye.service';
import { IncluyeController } from './incluye.controller';

@Module({
  controllers: [IncluyeController],
  providers: [IncluyeService],
})
export class IncluyeModule {}
