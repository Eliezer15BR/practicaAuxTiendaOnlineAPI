import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orden } from './entities/orden.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Incluye } from 'src/incluye/entities/incluye.entity';

@Injectable()
export class OrdenService {
  constructor(
    @InjectRepository(Orden)
    private readonly repositoryOrden: Repository<Orden>,
    @InjectRepository(Cliente)
    private readonly repositoryCliente: Repository<Cliente>,
    @InjectRepository(Incluye)
    private readonly repositoryIncluye: Repository<Incluye>,
  ) {}
  async create(createOrdenDto: CreateOrdenDto) {
    const cliente = await this.repositoryCliente.findOneBy({
      idCliente: createOrdenDto.idCliente,
    });
    if (!cliente)
      throw new NotFoundException(
        `Cliente con id ${createOrdenDto.idCliente} no encontrado`,
      );
    const orden = this.repositoryOrden.create({
      cliente: { idCliente: createOrdenDto.idCliente },
      ...createOrdenDto,
    });
    return this.repositoryOrden.save(orden);
  }

  async findAll() {
    return await this.repositoryOrden.find();
  }

  async findOne(id: number) {
    return await this.repositoryOrden.findOne({
      where: { idOrden: id },
      relations: ['incluye', 'incluye.producto'],
    });
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto) {
    const { idCliente, ...rest } = updateOrdenDto;
    const orden = await this.repositoryOrden.preload({
      idOrden: id,
      ...rest,
      ...(idCliente !== undefined && {
        cliente: { idCliente: idCliente },
      }),
    });
    if (!orden) throw new NotFoundException(`Orden con id ${id} no encontrada`);
    if (updateOrdenDto.idCliente !== undefined) {
      const cliente = await this.repositoryCliente.findOneBy({
        idCliente: id,
      });
      if (!cliente)
        throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    }
    return await this.repositoryOrden.save(orden);
  }

  async remove(id: number) {
    const orden = await this.findOne(id);
    if (!orden) throw new NotFoundException(`Orden con id ${id} no encontrado`);
    await this.repositoryIncluye.softDelete({
      orden: { idOrden: id },
    });
    return await this.repositoryOrden.softRemove(orden);
  }
}
