import { Producto } from 'src/producto/entities/producto.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    idCategoria: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @CreateDateColumn()
    creadoEn: Date;
    @UpdateDateColumn()
    actualizadoEn: Date;
    @DeleteDateColumn()
    eliminadoEn: Date;
    @OneToMany(() => Producto, (producto) => producto.categoria, { onDelete: "SET NULL" })
    @JoinColumn({ name: "idProducto" })
    producto: Producto[]
}
