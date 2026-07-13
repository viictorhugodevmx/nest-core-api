import {
  Body,
  Controller,
  Get,
  Param,
  Post
} from '@nestjs/common';

import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import {
  OpportunitiesService,
  Opportunity
} from './opportunities.service';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(
    private readonly opportunitiesService: OpportunitiesService
  ) {}

  @Get()
  findAll(): { data: Opportunity[] } {
    return {
      data: this.opportunitiesService.findAll()
    };
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ): { data: Opportunity | undefined } {
    return {
      data: this.opportunitiesService.findOne(
        Number(id)
      )
    };
  }

  @Post()
  create(
    @Body() createOpportunityDto: CreateOpportunityDto
  ): { data: Opportunity } {
    return {
      data: this.opportunitiesService.create(
        createOpportunityDto
      )
    };
  }
}
