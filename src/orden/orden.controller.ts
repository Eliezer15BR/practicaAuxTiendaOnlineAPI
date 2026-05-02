import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdenService } from './orden.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Orden } from './entities/orden.entity';

@ApiTags('Orden')
@Controller('orden')
export class OrdenController {
  constructor(private readonly ordenService: OrdenService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una orden' })
  @ApiResponse({
    status: 201,
    description: 'Orden creada correctamente',
    type: Orden,
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  create(@Body() createOrdenDto: CreateOrdenDto) {
    return this.ordenService.create(createOrdenDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las órdenes' })
  @ApiResponse({ status: 200, description: 'Lista de órdenes', type: [Orden] })
  findAll() {
    return this.ordenService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden con sus productos' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Orden encontrada con productos',
    type: Orden,
  })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  findOne(@Param('id') id: string) {
    return this.ordenService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una orden' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Orden actualizada', type: Orden })
  @ApiResponse({ status: 404, description: 'Orden o cliente no encontrado' })
  update(@Param('id') id: string, @Body() updateOrdenDto: UpdateOrdenDto) {
    return this.ordenService.update(+id, updateOrdenDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una orden (soft delete)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Orden eliminada (soft delete)' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada' })
  remove(@Param('id') id: string) {
    return this.ordenService.remove(+id);
  }
}
