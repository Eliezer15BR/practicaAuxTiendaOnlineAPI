import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncluyeService } from './incluye.service';
import { CreateIncluyeDto } from './dto/create-incluye.dto';
import { UpdateIncluyeDto } from './dto/update-incluye.dto';

@Controller('incluye')
export class IncluyeController {
  constructor(private readonly incluyeService: IncluyeService) {}

  @Post()
  create(@Body() createIncluyeDto: CreateIncluyeDto) {
    return this.incluyeService.create(createIncluyeDto);
  }

  @Get()
  findAll() {
    return this.incluyeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incluyeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIncluyeDto: UpdateIncluyeDto) {
    return this.incluyeService.update(+id, updateIncluyeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incluyeService.remove(+id);
  }
}
