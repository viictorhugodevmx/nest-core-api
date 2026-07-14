import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';

import {
  Types
} from 'mongoose';

import type {
  HydratedDocument
} from 'mongoose';

export type InterviewNoteDocument =
  HydratedDocument<InterviewNote>;

@Schema({
  timestamps: true
})
export class InterviewNote {
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'Opportunity'
  })
  opportunityId!: Types.ObjectId;

  @Prop({
    required: true,
    trim: true
  })
  interviewer!: string;

  @Prop({
    required: true,
    trim: true
  })
  notes!: string;
}

export const InterviewNoteSchema =
  SchemaFactory.createForClass(
    InterviewNote
  );
