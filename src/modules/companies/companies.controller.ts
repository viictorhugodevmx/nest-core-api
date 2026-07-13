import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post
} from '@nestjs/common';

import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

import type {
  Company
} from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService
  ) {}

  @Get()
  findAll(): { data: Company[] } {
    return {
      data: this.companiesService.findAll()
    };
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number
  ): { data: Company } {
    return {
      data: this.companiesService.findOne(id)
    };
  }

  @Post()
  create(
    @Body() createCompanyDto: CreateCompanyDto
  ): { data: Company } {
    return {
      data: this.companiesService.create(
        createCompanyDto
      )
    };
  }
}
