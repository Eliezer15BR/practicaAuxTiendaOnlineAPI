import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {

  @ApiProperty({ example: 1, description: 'ID de la categoría' })
  @IsNumber()
  idCategoria: number;

  @ApiProperty({ example: 'Laptop', maxLength: 50 })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  nombre: string;

  @ApiProperty({ example: 'Laptop gamer', maxLength: 50 })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  descripcion: string;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  precio: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  stock: number;
}