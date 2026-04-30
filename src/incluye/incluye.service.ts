import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncluyeDto } from './dto/create-incluye.dto';
import { UpdateIncluyeDto } from './dto/update-incluye.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incluye } from './entities/incluye.entity';
import { Repository } from 'typeorm';
import { Producto } from 'src/producto/entities/producto.entity';
import { Orden } from 'src/orden/entities/orden.entity';

@Injectable()
export class IncluyeService {
  constructor(
    @InjectRepository(Incluye)
    private readonly incluyeRepository: Repository<Incluye>,
    @InjectRepository(Orden)
    private readonly ordenRepository: Repository<Orden>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}
  async create(createIncluyeDto: CreateIncluyeDto) {
    const producto = await this.productoRepository.findOneBy({
      idProducto: createIncluyeDto.idProducto,
    });
    if (!producto)
      throw new NotFoundException(
        `Producto con el id ${createIncluyeDto.idProducto} no encontrado`,
      );
    const orden = await this.ordenRepository.findOneBy({
      idOrden: createIncluyeDto.idOrden,
    });
    if (!orden)
      throw new NotFoundException(
        `Orden con el id ${createIncluyeDto.idOrden} no encontrado`,
      );
    const incluye = this.incluyeRepository.create(createIncluyeDto);
    return this.incluyeRepository.save(incluye);
  }

  async findAll() {
    return await this.incluyeRepository.find();
  }

  async findOne(id: number) {
    return await this.incluyeRepository.findOneBy({
      idOrdenProducto: id,
    });
  }

  async update(id: number, updateIncluyeDto: UpdateIncluyeDto) {
    const incluye = await this.incluyeRepository.preload({
      idOrdenProducto: id,
      ...updateIncluyeDto,
    });
    if (!incluye)
      throw new NotFoundException(
        `Relacion Incluye con id ${id} no encontrada`,
      );
    if (updateIncluyeDto.idProducto !== undefined) {
      const producto = await this.productoRepository.findOneBy({
        idProducto: updateIncluyeDto.idProducto,
      });
      if (!producto)
        throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return await this.incluyeRepository.save(incluye);
  }

  async remove(id: number) {
    const incluye = await this.findOne(id);
    if (!incluye)
      throw new NotFoundException(
        `Relacion Incluye con id ${id} no encontrada`,
      );
    return await this.incluyeRepository.softRemove(incluye);
  }
}
