import {
  Body,
  Controller,
  Get,
  Param,
  Post
} from '@nestjs/common';

import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { RecruitersService } from './recruiters.service';

import type {
  RecruiterDocument
} from './schemas/recruiter.schema';

@Controller('recruiters')
export class RecruitersController {
  constructor(
    private readonly recruitersService: RecruitersService
  ) {}

  @Get()
  async findAll(): Promise<{
    data: RecruiterDocument[];
  }> {
    return {
      data: await this.recruitersService.findAll()
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<{
    data: RecruiterDocument;
  }> {
    return {
      data: await this.recruitersService.findOne(id)
    };
  }

  @Post()
  async create(
    @Body() createRecruiterDto: CreateRecruiterDto
  ): Promise<{
    data: RecruiterDocument;
  }> {
    return {
      data: await this.recruitersService.create(
        createRecruiterDto
      )
    };
  }
}
