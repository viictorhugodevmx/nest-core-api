import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ApiKeyGuard } from '../../common/guards/api-key.guard';
import { OpportunitiesController } from './opportunities.controller';
import { OpportunitiesService } from './opportunities.service';
import {
  Opportunity,
  OpportunitySchema
} from './schemas/opportunity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Opportunity.name,
        schema: OpportunitySchema
      }
    ])
  ],
  controllers: [
    OpportunitiesController
  ],
  providers: [
    OpportunitiesService,
    ApiKeyGuard
  ],
  exports: [
    MongooseModule
  ]
})
export class OpportunitiesModule {}
