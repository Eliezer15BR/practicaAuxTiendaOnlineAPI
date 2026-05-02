import { PartialType } from '@nestjs/swagger';
import { CreateIncluyeDto } from './create-incluye.dto';

export class UpdateIncluyeDto extends PartialType(CreateIncluyeDto) {}
