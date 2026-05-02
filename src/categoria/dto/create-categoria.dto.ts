import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Tecnología' })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  nombre: string;

  @ApiProperty({ example: 'Productos tecnológicos y electrónicos' })
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  descripcion: string;
}