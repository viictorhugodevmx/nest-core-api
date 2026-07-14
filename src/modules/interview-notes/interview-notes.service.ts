import {
  Injectable,
  NotFoundException
} from '@nestjs/common';

import {
  InjectModel
} from '@nestjs/mongoose';

import {
  Types
} from 'mongoose';

import type {
  Model
} from 'mongoose';

import { CreateInterviewNoteDto } from './dto/create-interview-note.dto';
import {
  InterviewNote,
  InterviewNoteDocument
} from './schemas/interview-note.schema';

@Injectable()
export class InterviewNotesService {
  constructor(
    @InjectModel(InterviewNote.name)
    private readonly interviewNoteModel:
      Model<InterviewNoteDocument>
  ) {}

  async findAll(): Promise<
    InterviewNoteDocument[]
  > {
    return this.interviewNoteModel
      .find()
      .sort({
        createdAt: -1
      })
      .exec();
  }

  async findOne(
    id: string
  ): Promise<InterviewNoteDocument> {
    const interviewNote =
      await this.interviewNoteModel
        .findById(id)
        .exec();

    if (!interviewNote) {
      throw new NotFoundException(
        `Interview note with id ${id} was not found`
      );
    }

    return interviewNote;
  }

  async create(
    createInterviewNoteDto:
      CreateInterviewNoteDto
  ): Promise<InterviewNoteDocument> {
    const interviewNote =
      new this.interviewNoteModel({
        ...createInterviewNoteDto,
        opportunityId: new Types.ObjectId(
          createInterviewNoteDto.opportunityId
        )
      });

    return interviewNote.save();
  }
}
