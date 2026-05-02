import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  idCliente: number;

  @ApiProperty({ example: 'Juan' })
  @Column()
  nombres: string;

  @ApiProperty({ example: 'Perez' })
  @Column()
  paterno: string;

  @ApiProperty({ example: 'Gomez' })
  @Column()
  materno: string;

  @ApiProperty({ example: 'juan@gmail.com' })
  @Column()
  email: string;

  @ApiProperty()
  @CreateDateColumn()
  creadoEn: Date;

  @ApiProperty()
  @UpdateDateColumn()
  actualizadoEn: Date;

  @ApiProperty({ required: false })
  @DeleteDateColumn()
  eliminadoEn: Date;

  @ApiProperty({ type: () => [Orden] })
  @OneToMany(() => Orden, (orden) => orden.cliente)
  orden: Orden[];
}