import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IncluyeService } from './incluye.service';
import { CreateIncluyeDto } from './dto/create-incluye.dto';
import { UpdateIncluyeDto } from './dto/update-incluye.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Incluye } from './entities/incluye.entity';

@ApiTags('Incluye')
@Controller('incluye')
export class IncluyeController {
  constructor(private readonly incluyeService: IncluyeService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar un producto a una orden' })
  @ApiResponse({
    status: 201,
    description: 'Relación creada correctamente',
    type: Incluye,
  })
  @ApiResponse({
    status: 404,
    description: 'Producto o orden no encontrada',
  })
  create(@Body() createIncluyeDto: CreateIncluyeDto) {
    return this.incluyeService.create(createIncluyeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las relaciones orden-producto' })
  @ApiResponse({
    status: 200,
    description: 'Lista de relaciones',
    type: [Incluye],
  })
  findAll() {
    return this.incluyeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una relación por ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Relación encontrada',
    type: Incluye,
  })
  @ApiResponse({
    status: 404,
    description: 'Relación no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.incluyeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una relación orden-producto' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Relación actualizada correctamente',
    type: Incluye,
  })
  @ApiResponse({
    status: 404,
    description: 'Relación, producto u orden no encontrada',
  })
  update(@Param('id') id: string, @Body() updateIncluyeDto: UpdateIncluyeDto) {
    return this.incluyeService.update(+id, updateIncluyeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una relación (soft delete)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Relación eliminada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Relación no encontrada',
  })
  remove(@Param('id') id: string) {
    return this.incluyeService.remove(+id);
  }
}
