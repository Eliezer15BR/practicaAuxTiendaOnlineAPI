import { ApiProperty } from '@nestjs/swagger';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Incluye } from 'src/incluye/entities/incluye.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Orden {

  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  idOrden: number;

  @ApiProperty({ example: 'PENDIENTE' })
  @Column()
  estado: string;

  @ApiProperty({ example: 150.50 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @ApiProperty()
  @CreateDateColumn()
  creadoEn: Date;

  @ApiProperty()
  @UpdateDateColumn()
  actualizadoEn: Date;

  @ApiProperty({ required: false })
  @DeleteDateColumn()
  eliminadoEn: Date;

  @ApiProperty({ type: () => Cliente })
  @ManyToOne(() => Cliente, (cliente) => cliente.orden, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente;

  @ApiProperty({ type: () => [Incluye] })
  @OneToMany(() => Incluye, (incluye) => incluye.orden)
  incluye: Incluye[];
}
