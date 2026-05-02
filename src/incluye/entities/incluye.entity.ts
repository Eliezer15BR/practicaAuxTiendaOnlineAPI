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
    @PrimaryGeneratedColumn()
    idOrdenProducto: number;
    @Column()
    cantidad: number;
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    precio_unitario: number;
    @CreateDateColumn()
    creadoEn: Date;
    @UpdateDateColumn()
    actualizadoEn: Date;
    @DeleteDateColumn()
    eliminadoEn: Date;
    @ManyToOne(() => Producto, (producto) => producto.incluye, { nullable: false })
    @JoinColumn({ name: "idProducto" })
    producto: Producto;
    @ManyToOne(() => Orden, (orden) => orden.incluye, { nullable: false })
    @JoinColumn({ name: "idOrden" })
    orden: Orden;
}
