import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Incluye } from 'src/incluye/entities/incluye.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Orden {
    @PrimaryGeneratedColumn()
    idOrden: number;
    @Column()
    estado: string;
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;
    @CreateDateColumn()
    creadoEn: Date;
    @UpdateDateColumn()
    actualizadoEn: Date;
    @DeleteDateColumn()
    eliminadoEn: Date;
    @ManyToOne(() => Cliente, (cliente) => cliente.orden, {nullable:false, onDelete:"CASCADE"})
    @JoinColumn({ name: "idCliente" })
    cliente: Cliente;
    @OneToMany(() => Incluye, (incluye) => incluye.orden)
    incluye: Incluye[];

}
