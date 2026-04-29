import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoriaDto {
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    nombre: string;
    @IsString()
    @MinLength(1)
    @MaxLength(120)
    descripcion: string;
}
