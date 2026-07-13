import { Type } from 'class-transformer';

import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min
} from 'class-validator';

export type OpportunitySortField =
  | 'company'
  | 'position'
  | 'status'
  | 'workMode'
  | 'salary';

export type SortOrder = 'asc' | 'desc';

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
  @IsIn([
    'company',
    'position',
    'status',
    'workMode',
    'salary'
  ])
  sortBy: OpportunitySortField = 'company';

  @IsOptional()
  @IsIn([
    'asc',
    'desc'
  ])
  order: SortOrder = 'asc';

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
