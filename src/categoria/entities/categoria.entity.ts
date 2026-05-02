import { ApiProperty } from '@nestjs/swagger';
import { Producto } from 'src/producto/entities/producto.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Categoria {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  idCategoria: number;

  @ApiProperty({ example: 'Tecnología' })
  @Column()
  nombre: string;

  @ApiProperty({ example: 'Productos electrónicos' })
  @Column()
  descripcion: string;

  @ApiProperty()
  @CreateDateColumn()
  creadoEn: Date;

  @ApiProperty()
  @UpdateDateColumn()
  actualizadoEn: Date;

  @ApiProperty({ required: false })
  @DeleteDateColumn()
  eliminadoEn: Date;

  @ApiProperty({ type: () => [Producto] })
  @OneToMany(() => Producto, (producto) => producto.categoria)
  producto: Producto[];
}
