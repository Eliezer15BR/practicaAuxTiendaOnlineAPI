import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateOrdenDto {
    @ApiProperty({ example: 1, description: 'ID del cliente' })
    @IsNumber()
    idCliente: number;
    @ApiProperty({ example: 'PENDIENTE' })
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    estado: string;
  @ApiProperty({ example: 150.5 })
    @IsNumber()
    total: number;
}
