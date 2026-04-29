import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ){}
  async create(createCategoriaDto: CreateCategoriaDto) {
    const producto = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(producto);
  }

  async findAll() {
    return await this.categoriaRepository.find();
  }

  async findOne(id: number) {
    return await this.categoriaRepository.findOneBy({ idCategoria: id });
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);
    if (!categoria)
      throw new NotFoundException(`Categoria con id ${id} no encontrada`);
    return await this.categoriaRepository.update(id, updateCategoriaDto);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    if (!categoria)
      throw new NotFoundException(`Categoria con id ${id} no encontrada`);
    return await this.categoriaRepository.softDelete(id);
  }
}
