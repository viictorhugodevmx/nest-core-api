import {
  IsMongoId,
  IsNotEmpty,
  IsString
} from 'class-validator';

export class CreateInterviewNoteDto {
  @IsMongoId()
  opportunityId!: string;

  @IsString()
  @IsNotEmpty()
  interviewer!: string;

  @IsString()
  @IsNotEmpty()
  notes!: string;
}
