import { Module } from '@nestjs/common';
import { InterviewNotesController } from './interview-notes.controller';
import { InterviewNotesService } from './interview-notes.service';

@Module({
  controllers: [InterviewNotesController],
  providers: [InterviewNotesService]
})
export class InterviewNotesModule {}
