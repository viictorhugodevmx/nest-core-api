import {
  Prop,
  Schema,
  SchemaFactory
} from '@nestjs/mongoose';

import type {
  HydratedDocument
} from 'mongoose';

export type CompanyDocument =
  HydratedDocument<Company>;

@Schema({
  timestamps: true
})
export class Company {
  @Prop({
    required: true,
    trim: true
  })
  name!: string;

  @Prop({
    required: true,
    trim: true
  })
  industry!: string;

  @Prop({
    trim: true
  })
  website?: string;
}

export const CompanySchema =
  SchemaFactory.createForClass(Company);
