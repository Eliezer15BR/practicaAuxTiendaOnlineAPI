import { PartialType } from '@nestjs/mapped-types';
import { CreateIncluyeDto } from './create-incluye.dto';

export class UpdateIncluyeDto extends PartialType(CreateIncluyeDto) {}
