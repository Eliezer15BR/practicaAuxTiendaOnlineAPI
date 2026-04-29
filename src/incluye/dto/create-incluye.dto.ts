import { IsNumber } from 'class-validator';

export class CreateIncluyeDto {
    @IsNumber()
    cantidad: number;
    @IsNumber()
    precio_unitario: number;
    @IsNumber()
    idProducto: number;
    @IsNumber()
    idOrden: number;
}
