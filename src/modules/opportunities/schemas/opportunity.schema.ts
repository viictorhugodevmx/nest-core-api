import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';

import type {
  HydratedDocument
} from 'mongoose';

export type OpportunityDocument =
  HydratedDocument<Opportunity>;

@Schema({
  timestamps: true
})
export class Opportunity {
  @Prop({
    required: true,
    trim: true
  })
  company!: string;

  @Prop({
    required: true,
    trim: true
  })
  position!: string;

  @Prop({
    required: true,
    enum: [
      'saved',
      'applied',
      'interview',
      'offer',
      'rejected'
    ]
  })
  status!: string;

  @Prop({
    required: true,
    enum: [
      'remote',
      'hybrid',
      'onsite'
    ]
  })
  workMode!: string;

  @Prop({
    type: Number,
    default: null,
    min: 1
  })
  salary!: number | null;
}

export const OpportunitySchema =
  SchemaFactory.createForClass(Opportunity);
