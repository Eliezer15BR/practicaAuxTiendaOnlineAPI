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
    @PrimaryGeneratedColumn()
    idProducto: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio: number;
    @Column()
    stock: number;
    @CreateDateColumn()
    creadoEn: Date;
    @UpdateDateColumn()
    actualizadoEn: Date;
    @DeleteDateColumn()
    eliminadoEn: Date;
    @ManyToOne(() => Categoria, (categoria)=> categoria.producto, {onDelete: "CASCADE", nullable:false})
    @JoinColumn({ name: "idCategoria" })
    categoria: Categoria;
    @OneToMany(() => Incluye, (incluye) => incluye.producto)
    incluye: Incluye[];
}
