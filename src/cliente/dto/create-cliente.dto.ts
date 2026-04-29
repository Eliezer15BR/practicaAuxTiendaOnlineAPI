import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateClienteDto {
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    nombres: string;
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    paterno: string;
    @IsString()
    @MinLength(1)
    @MaxLength(30)
    materno: string;
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    email: string;
}
