import {
  IsIn,
  IsOptional,
  IsString
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
}
