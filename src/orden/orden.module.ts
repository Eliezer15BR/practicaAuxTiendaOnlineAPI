import { Module } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { OrdenController } from './orden.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Orden } from './entities/orden.entity';
import { Incluye } from 'src/incluye/entities/incluye.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orden, Cliente, Incluye])],
  controllers: [OrdenController],
  providers: [OrdenService],
})
export class OrdenModule {}
