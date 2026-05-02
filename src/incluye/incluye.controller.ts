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

@ApiTags('OrdenProducto (Incluye)')
@Controller('orden_producto')
export class IncluyeController {
  constructor(private readonly incluyeService: IncluyeService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar un producto a una orden' })
  @ApiResponse({
    status: 201,
    description: 'Relación orden-producto creada correctamente',
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
  @ApiOperation({
    summary:
      'Obtener una relación orden-producto por ID (incluye el producto relacionado)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación incluye (orden_producto)',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Relación encontrada con su producto asociado',
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
  @ApiParam({
    name: 'id',
    description: 'ID de la relación incluye',
    example: 1,
  })
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
  @ApiOperation({ summary: 'Eliminar una relación por ID (soft delete)' })
  @ApiParam({
    name: 'id',
    description: 'ID de la relación incluye',
    example: 1,
  })
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

  @Delete(':ordenId/producto/:productoId')
  @ApiOperation({
    summary: 'Eliminar un producto específico de una orden (soft delete)',
  })
  @ApiParam({
    name: 'ordenId',
    description: 'ID de la orden',
    example: 1,
  })
  @ApiParam({
    name: 'productoId',
    description: 'ID del producto',
    example: 5,
  })
  @ApiResponse({
    status: 200,
    description: 'Relación orden-producto eliminada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Relación no encontrada',
  })
  removeProducto(
    @Param('ordenId') ordenId: string,
    @Param('productoId') productoId: string,
  ) {
    return this.incluyeService.removeProducto(+ordenId, +productoId);
  }
}
