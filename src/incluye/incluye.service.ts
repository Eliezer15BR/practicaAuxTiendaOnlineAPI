import { Injectable } from '@nestjs/common';
import { CreateIncluyeDto } from './dto/create-incluye.dto';
import { UpdateIncluyeDto } from './dto/update-incluye.dto';

@Injectable()
export class IncluyeService {
  create(createIncluyeDto: CreateIncluyeDto) {
    return 'This action adds a new incluye';
  }

  findAll() {
    return `This action returns all incluye`;
  }

  findOne(id: number) {
    return `This action returns a #${id} incluye`;
  }

  update(id: number, updateIncluyeDto: UpdateIncluyeDto) {
    return `This action updates a #${id} incluye`;
  }

  remove(id: number) {
    return `This action removes a #${id} incluye`;
  }
}
