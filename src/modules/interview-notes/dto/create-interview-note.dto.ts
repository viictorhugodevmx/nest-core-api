import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min
} from 'class-validator';

export class CreateInterviewNoteDto {
  @IsInt()
  @Min(1)
  opportunityId!: number;

  @IsString()
  @IsNotEmpty()
  interviewer!: string;

  @IsString()
  @IsNotEmpty()
  notes!: string;
}
