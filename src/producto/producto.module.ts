import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Producto } from './entities/producto.entity';
import { Incluye } from 'src/incluye/entities/incluye.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Producto, Incluye])],
  controllers: [ProductoController],
  providers: [ProductoService],
  exports: [ProductoService],
})
export class ProductoModule {}
