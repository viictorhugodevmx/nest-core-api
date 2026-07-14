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

import {
  Opportunity
} from '../opportunities/schemas/opportunity.schema';
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
      Model<InterviewNoteDocument>,

    @InjectModel(Opportunity.name)
    private readonly opportunityModel:
      Model<Opportunity>
  ) {}

  async findAll(): Promise<
    InterviewNoteDocument[]
  > {
    return this.interviewNoteModel
      .find()
      .populate(
        'opportunityId',
        'company position status workMode salary'
      )
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
        .populate(
          'opportunityId',
          'company position status workMode salary'
        )
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
    const opportunityExists =
      await this.opportunityModel.exists({
        _id: createInterviewNoteDto.opportunityId
      });

    if (!opportunityExists) {
      throw new NotFoundException(
        `Opportunity with id ${createInterviewNoteDto.opportunityId} was not found`
      );
    }

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
