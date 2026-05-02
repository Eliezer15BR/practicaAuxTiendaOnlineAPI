import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  nombres: string;

  @ApiProperty({ example: 'Perez' })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  paterno: string;

  @ApiProperty({ example: 'Gomez' })
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  materno: string;

  @ApiProperty({ example: 'juan@gmail.com' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  email: string;
}