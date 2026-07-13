import { Type } from 'class-transformer';

import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min
} from 'class-validator';

export class FilterOpportunitiesDto {
  @IsOptional()
  @IsIn([
    'saved',
    'applied',
    'interview',
    'offer',
    'rejected'
  ])
  status?: string;

  @IsOptional()
  @IsIn([
    'remote',
    'hybrid',
    'onsite'
  ])
  workMode?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 10;
}
