import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { Orden } from 'src/orden/entities/orden.entity';
import { OrdenService } from 'src/orden/orden.service';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,
    private ordenService: OrdenService,
  ) {}
  async create(createClienteDto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  async findAll() {
    return await this.clienteRepository.find();
  }

  async findOne(id: number) {
    return await this.clienteRepository.findOneBy({ idCliente: id });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.preload({
      idCliente: id,
      ...updateClienteDto,
    });
    if (!cliente)
      throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    return await this.clienteRepository.save(cliente);
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);
    if (!cliente)
      throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    const ordenes = await this.ordenRepository.findBy({
      cliente: { idCliente: id },
    });
    for (const orden of ordenes) {
      await this.ordenService.remove(orden.idOrden);
    }
    return await this.clienteRepository.softRemove(cliente);
  }
}
