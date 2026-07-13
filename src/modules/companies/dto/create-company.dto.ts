import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  industry!: string;

  @IsOptional()
  @IsUrl()
  website?: string;
}
