import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';

import type {
  HydratedDocument
} from 'mongoose';

export type RecruiterDocument =
  HydratedDocument<Recruiter>;

@Schema({
  timestamps: true
})
export class Recruiter {
  @Prop({
    required: true,
    trim: true
  })
  name!: string;

  @Prop({
    required: true,
    lowercase: true,
    trim: true
  })
  email!: string;

  @Prop({
    required: true,
    trim: true
  })
  company!: string;

  @Prop({
    trim: true
  })
  phone?: string;
}

export const RecruiterSchema =
  SchemaFactory.createForClass(Recruiter);
