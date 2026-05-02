import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { Producto } from 'src/producto/entities/producto.entity';
import { ProductoService } from 'src/producto/producto.service';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    private productoService: ProductoService,
  ) {}
  async create(createCategoriaDto: CreateCategoriaDto) {
    const producto = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(producto);
  }

  async findAll() {
    return await this.categoriaRepository.find();
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOneBy({
      idCategoria: id,
    });
    if (!categoria)
      throw new NotFoundException(`Categoria con el id ${id} no encontrado`);
    return await this.categoriaRepository.findOne({
      where: { idCategoria: id },
      relations: ['producto'],
    });
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.categoriaRepository.preload({
      idCategoria: id,
      ...updateCategoriaDto,
    });
    if (!categoria)
      throw new NotFoundException(`Categoria con id ${id} no encontrada`);
    return await this.categoriaRepository.save(categoria);
  }

  async remove(id: number) {
    const categoria = await this.categoriaRepository.findOneBy({
      idCategoria: id,
    });
    if (!categoria)
      throw new NotFoundException(`Categoria con id ${id} no encontrada`);
    const productos = await this.productoRepository.findBy({
      categoria: { idCategoria: id },
    });
    for (const producto of productos) {
      await this.productoService.remove(producto.idProducto);
    }
    return await this.categoriaRepository.softRemove(categoria);
  }
}
