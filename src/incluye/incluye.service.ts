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
    const incluye = this.incluyeRepository.create({
      ...createIncluyeDto,
      orden: { idOrden: createIncluyeDto.idOrden },
      producto: { idProducto: createIncluyeDto.idProducto },
    });
    return this.incluyeRepository.save(incluye);
  }

  async findAll() {
    return await this.incluyeRepository.find();
  }

  async findOne(id: number) {
    const incluye = await this.incluyeRepository.findOneBy({
      idOrdenProducto: id,
    });
    if (!incluye)
      throw new NotFoundException(`Incluye con id ${id} no encontrado`);
    return await this.incluyeRepository.findOneBy({
      idOrdenProducto: id,
    });
  }

  async update(id: number, updateIncluyeDto: UpdateIncluyeDto) {
    const { idOrden, idProducto, ...rest } = updateIncluyeDto;
    const incluye = await this.incluyeRepository.preload({
      idOrdenProducto: id,
      ...rest,
      ...(idOrden !== undefined && {
        orden: { idOrden: idOrden },
      }),
      ...(idProducto !== undefined && {
        producto: { idProducto: idProducto },
      }),
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
        throw new NotFoundException(
          `Producto con id ${updateIncluyeDto.idProducto} no encontrado`,
        );
    }
    if (updateIncluyeDto.idOrden !== undefined) {
      const orden = await this.ordenRepository.findOneBy({
        idOrden: updateIncluyeDto.idOrden,
      });
      if (!orden)
        throw new NotFoundException(
          `Orden con id ${updateIncluyeDto.idProducto} no encontrado`,
        );
    }
    return await this.incluyeRepository.save(incluye);
  }

  async remove(id: number) {
    const incluye = await this.incluyeRepository.findOneBy({
      idOrdenProducto: id,
    });
    if (!incluye)
      throw new NotFoundException(
        `Relacion Incluye con id ${id} no encontrada`,
      );
    return await this.incluyeRepository.softRemove(incluye);
  }
}
