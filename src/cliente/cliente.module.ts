import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Orden } from 'src/orden/entities/orden.entity';
import { OrdenModule } from 'src/orden/orden.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Orden]), OrdenModule],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}
