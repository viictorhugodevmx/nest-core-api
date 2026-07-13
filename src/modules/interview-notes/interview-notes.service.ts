import {
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { CreateInterviewNoteDto } from './dto/create-interview-note.dto';

export interface InterviewNote {
  id: number;
  opportunityId: number;
  interviewer: string;
  notes: string;
  createdAt: string;
}

@Injectable()
export class InterviewNotesService {
  private readonly interviewNotes: InterviewNote[] = [
    {
      id: 1,
      opportunityId: 2,
      interviewer: 'Carlos Ruiz',
      notes: 'Technical interview focused on Angular and TypeScript.',
      createdAt: new Date().toISOString()
    }
  ];

  findAll(): InterviewNote[] {
    return this.interviewNotes;
  }

  findOne(id: number): InterviewNote {
    const interviewNote = this.interviewNotes.find(
      (item) => item.id === id
    );

    if (!interviewNote) {
      throw new NotFoundException(
        `Interview note with id ${id} was not found`
      );
    }

    return interviewNote;
  }

  create(
    createInterviewNoteDto: CreateInterviewNoteDto
  ): InterviewNote {
    const interviewNote: InterviewNote = {
      id: this.getNextId(),
      ...createInterviewNoteDto,
      createdAt: new Date().toISOString()
    };

    this.interviewNotes.push(interviewNote);

    return interviewNote;
  }

  private getNextId(): number {
    const highestId = Math.max(
      ...this.interviewNotes.map(
        (interviewNote) => interviewNote.id
      ),
      0
    );

    return highestId + 1;
  }
}
