import {
  Body,
  Controller,
  Get,
  Param,
  Post
} from '@nestjs/common';

import { CreateInterviewNoteDto } from './dto/create-interview-note.dto';
import { InterviewNotesService } from './interview-notes.service';

import type {
  InterviewNoteDocument
} from './schemas/interview-note.schema';

@Controller('interview-notes')
export class InterviewNotesController {
  constructor(
    private readonly interviewNotesService:
      InterviewNotesService
  ) {}

  @Get()
  async findAll(): Promise<{
    data: InterviewNoteDocument[];
  }> {
    return {
      data:
        await this.interviewNotesService
          .findAll()
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<{
    data: InterviewNoteDocument;
  }> {
    return {
      data:
        await this.interviewNotesService
          .findOne(id)
    };
  }

  @Post()
  async create(
    @Body()
    createInterviewNoteDto:
      CreateInterviewNoteDto
  ): Promise<{
    data: InterviewNoteDocument;
  }> {
    return {
      data:
        await this.interviewNotesService
          .create(
            createInterviewNoteDto
          )
    };
  }
}
