import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIncluyeDto {
  @ApiProperty({ example: 2, description: 'Cantidad del producto en la orden' })
  @IsNumber()
  cantidad: number;

  @ApiProperty({
    example: 50.5,
    description: 'Precio unitario del producto en la orden',
  })
  @IsNumber()
  precio_unitario: number;

  @ApiProperty({ example: 1, description: 'ID del producto' })
  @IsNumber()
  idProducto: number;

  @ApiProperty({ example: 1, description: 'ID de la orden' })
  @IsNumber()
  idOrden: number;
}