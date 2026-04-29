import { Orden } from 'src/orden/entities/orden.entity';
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
export class Cliente {
    @PrimaryGeneratedColumn()
    idCliente: number;
    @Column()
    nombres: string;
    @Column()
    paterno: string;
    @Column()
    materno: string;
    @Column()
    email: string;
    @CreateDateColumn()
    creadoEn: Date;
    @UpdateDateColumn()
    actualizadoEn: Date;
    @DeleteDateColumn()
    eliminadoEn: Date;
    @OneToMany(() => Orden, (orden) => orden.cliente, { onDelete: "CASCADE" })
    orden: Orden[]

}
