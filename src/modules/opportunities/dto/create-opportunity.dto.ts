import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString
} from 'class-validator';

export class CreateOpportunityDto {
  @IsString()
  @IsNotEmpty()
  company!: string;

  @IsString()
  @IsNotEmpty()
  position!: string;

  @IsIn([
    'saved',
    'applied',
    'interview',
    'offer',
    'rejected'
  ])
  status!: string;

  @IsIn([
    'remote',
    'hybrid',
    'onsite'
  ])
  workMode!: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  salary!: number | null;
}
