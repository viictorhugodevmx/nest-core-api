import {
  Controller,
  Get,
  Param
} from '@nestjs/common';

import { OpportunitiesService } from './opportunities.service';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(
    private readonly opportunitiesService: OpportunitiesService
  ) {}

  @Get()
  findAll() {
    return {
      data: this.opportunitiesService.findAll()
    };
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return {
      data: this.opportunitiesService.findOne(
        Number(id)
      )
    };
  }
}
