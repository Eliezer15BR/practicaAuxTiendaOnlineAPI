import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Incluye } from 'src/incluye/entities/incluye.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Incluye)
    private readonly incluyeRepository: Repository<Incluye>,
  ) {}
  async create(createProductoDto: CreateProductoDto) {
    const categoria = await this.categoriaRepository.findOneBy({
      idCategoria: createProductoDto.idCategoria,
    });
    if (!categoria)
      throw new NotFoundException(
        `Categoria con id ${createProductoDto.idCategoria} no encontrado`,
      );
    const producto = this.productoRepository.create({
      categoria: { idCategoria: createProductoDto.idCategoria },
      ...createProductoDto,
    });
    return await this.productoRepository.save(producto);
  }

  async findAll() {
    return await this.productoRepository.find();
  }

  async findOne(id: number) {
    const producto = await this.productoRepository.findOneBy({
      idProducto: id,
    });
    if (!producto)
      throw new NotFoundException(`Producto con el id ${id} no encontrado`);
    return await this.productoRepository.findOne({
      where: { idProducto: id },
      relations: ['categoria'],
    });
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const { idCategoria, ...rest } = updateProductoDto;
    const producto = await this.productoRepository.preload({
      idProducto: id,
      ...rest,
      ...(idCategoria !== undefined && {
        categoria: { idCategoria: idCategoria },
      }),
    });
    if (!producto)
      throw new NotFoundException(`Producto con ${id} no encontrado`);
    if (idCategoria !== undefined) {
      //Para evitar la doble query
      const categoria = await this.categoriaRepository.findOneBy({
        idCategoria: idCategoria,
      });
      if (!categoria)
        throw new NotFoundException(
          `Categoria con ${updateProductoDto.idCategoria} no encontrado`,
        );
    }
    return await this.productoRepository.save(producto);
  }

  async remove(id: number) {
    const producto = await this.productoRepository.findOneBy({
      idProducto: id,
    });
    if (!producto)
      throw new NotFoundException(`Producto con el id ${id} no encontrado`);
    await this.incluyeRepository.softDelete({ producto: { idProducto: id } });
    return this.productoRepository.softRemove(producto);
  }
}
