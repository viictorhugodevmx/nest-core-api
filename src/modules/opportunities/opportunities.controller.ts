import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';

import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { FilterOpportunitiesDto } from './dto/filter-opportunities.dto';
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
  findAll(
    @Query() filters: FilterOpportunitiesDto
  ): { data: Opportunity[] } {
    return {
      data: this.opportunitiesService.findAll(
        filters
      )
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('id', ParseIntPipe) id: number
  ): void {
    this.opportunitiesService.remove(id);
  }
}
