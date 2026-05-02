import { ApiProperty } from '@nestjs/swagger';
import { Orden } from 'src/orden/entities/orden.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Incluye {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  idOrdenProducto: number;

  @ApiProperty({ example: 2 })
  @Column()
  cantidad: number;

  @ApiProperty({ example: 50.5 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;

  @ApiProperty()
  @CreateDateColumn()
  creadoEn: Date;

  @ApiProperty()
  @UpdateDateColumn()
  actualizadoEn: Date;

  @ApiProperty({ required: false })
  @DeleteDateColumn()
  eliminadoEn: Date;

  @ApiProperty({ type: () => Producto })
  @ManyToOne(() => Producto, (producto) => producto.incluye, {
    nullable: false,
  })
  @JoinColumn({ name: 'idProducto' })
  producto: Producto;

  @ApiProperty({ type: () => Orden })
  @ManyToOne(() => Orden, (orden) => orden.incluye, { nullable: false })
  @JoinColumn({ name: 'idOrden' })
  orden: Orden;
}