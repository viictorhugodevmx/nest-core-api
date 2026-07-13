import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';

import { CreateInterviewNoteDto } from './dto/create-interview-note.dto';
import { InterviewNotesService } from './interview-notes.service';

import type {
  InterviewNote
} from './interview-notes.service';

@Controller('interview-notes')
export class InterviewNotesController {
  constructor(
    private readonly interviewNotesService: InterviewNotesService
  ) {}

  @Get()
  findAll(): { data: InterviewNote[] } {
    return {
      data: this.interviewNotesService.findAll()
    };
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): { data: InterviewNote } {
    return {
      data: this.interviewNotesService.findOne(id)
    };
  }

  @Post()
  create(
    @Body() createInterviewNoteDto: CreateInterviewNoteDto
  ): { data: InterviewNote } {
    return {
      data: this.interviewNotesService.create(
        createInterviewNoteDto
      )
    };
  }
}
