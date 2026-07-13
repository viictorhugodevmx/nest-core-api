import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';

import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { RecruitersService } from './recruiters.service';

import type {
  Recruiter
} from './recruiters.service';

@Controller('recruiters')
export class RecruitersController {
  constructor(
    private readonly recruitersService: RecruitersService
  ) {}

  @Get()
  findAll(): { data: Recruiter[] } {
    return {
      data: this.recruitersService.findAll()
    };
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): { data: Recruiter } {
    return {
      data: this.recruitersService.findOne(id)
    };
  }

  @Post()
  create(
    @Body() createRecruiterDto: CreateRecruiterDto
  ): { data: Recruiter } {
    return {
      data: this.recruitersService.create(
        createRecruiterDto
      )
    };
  }
}
