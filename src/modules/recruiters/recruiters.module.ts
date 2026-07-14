import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecruitersController } from './recruiters.controller';
import { RecruitersService } from './recruiters.service';
import {
  Recruiter,
  RecruiterSchema
} from './schemas/recruiter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Recruiter.name,
        schema: RecruiterSchema
      }
    ])
  ],
  controllers: [
    RecruitersController
  ],
  providers: [
    RecruitersService
  ]
})
export class RecruitersModule {}
