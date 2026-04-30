import { Module } from '@nestjs/common';
import { IncluyeService } from './incluye.service';
import { IncluyeController } from './incluye.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incluye } from './entities/incluye.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import { Orden } from 'src/orden/entities/orden.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Incluye, Producto, Orden])],
  controllers: [IncluyeController],
  providers: [IncluyeService],
})
export class IncluyeModule {}
