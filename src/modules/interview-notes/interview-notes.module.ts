import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InterviewNotesController } from './interview-notes.controller';
import { InterviewNotesService } from './interview-notes.service';
import {
  InterviewNote,
  InterviewNoteSchema
} from './schemas/interview-note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: InterviewNote.name,
        schema: InterviewNoteSchema
      }
    ])
  ],
  controllers: [
    InterviewNotesController
  ],
  providers: [
    InterviewNotesService
  ]
})
export class InterviewNotesModule {}
