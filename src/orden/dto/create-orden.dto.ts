import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateOrdenDto {
    @IsNumber()
    idCliente: number;
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    estado: string;
    @IsNumber()
    total: number;
}
