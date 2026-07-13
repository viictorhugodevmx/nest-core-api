import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from '@nestjs/common';

import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
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
    @Param('id', ParseIntPipe) id: number
  ): { data: Opportunity } {
    return {
      data: this.opportunitiesService.findOne(id)
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

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOpportunityDto: UpdateOpportunityDto
  ): { data: Opportunity } {
    return {
      data: this.opportunitiesService.update(
        id,
        updateOpportunityDto
      )
    };
  }
}
