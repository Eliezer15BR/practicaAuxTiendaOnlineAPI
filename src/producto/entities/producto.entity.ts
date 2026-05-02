import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Incluye } from 'src/incluye/entities/incluye.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Producto {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  idProducto: number;

  @ApiProperty({ example: 'Laptop' })
  @Column()
  nombre: string;

  @ApiProperty({ example: 'Laptop gamer', maxLength: 50 })
  @Column()
  descripcion: string;

  @ApiProperty({ example: 1500.5 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ApiProperty({ example: 10 })
  @Column()
  stock: number;

  @ApiProperty()
  @CreateDateColumn()
  creadoEn: Date;

  @ApiProperty()
  @UpdateDateColumn()
  actualizadoEn: Date;

  @ApiProperty({ required: false, nullable: true })
  @DeleteDateColumn()
  eliminadoEn: Date;

  @ApiProperty({ type: () => Categoria })
  @ManyToOne(() => Categoria, (categoria) => categoria.producto, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'idCategoria' })
  categoria: Categoria;

  @ApiProperty({ type: () => [Incluye] })
  @OneToMany(() => Incluye, (incluye) => incluye.producto)
  incluye: Incluye[];
}