import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProductoDto {
    @IsNumber()
    idCategoria: number;
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    nombre: string;
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    descripcion: string;
    @IsNumber()
    precio: number;
    @IsNumber()
    stock: number;
}
