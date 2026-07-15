import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';

import { ApiKeyGuard } from '../../common/guards/api-key.guard';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { FilterOpportunitiesDto } from './dto/filter-opportunities.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { OpportunitiesService } from './opportunities.service';

import type {
  OpportunitiesResult
} from './opportunities.service';

import type {
  OpportunityDocument
} from './schemas/opportunity.schema';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(
    private readonly opportunitiesService:
      OpportunitiesService
  ) {}

  @Get()
  async findAll(
    @Query() filters: FilterOpportunitiesDto
  ): Promise<OpportunitiesResult> {
    return this.opportunitiesService.findAll(
      filters
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<{
    data: OpportunityDocument;
  }> {
    return {
      data:
        await this.opportunitiesService
          .findOne(id)
    };
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  async create(
    @Body()
    createOpportunityDto:
      CreateOpportunityDto
  ): Promise<{
    data: OpportunityDocument;
  }> {
    return {
      data:
        await this.opportunitiesService
          .create(
            createOpportunityDto
          )
    };
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  async update(
    @Param('id') id: string,
    @Body()
    updateOpportunityDto:
      UpdateOpportunityDto
  ): Promise<{
    data: OpportunityDocument;
  }> {
    return {
      data:
        await this.opportunitiesService
          .update(
            id,
            updateOpportunityDto
          )
    };
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string
  ): Promise<void> {
    await this.opportunitiesService.remove(
      id
    );
  }
}
