import {
  Body,
  Controller,
  Get,
  Param,
  Post
} from '@nestjs/common';

import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';

import type {
  CompanyDocument
} from './schemas/company.schema';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService
  ) {}

  @Get()
  async findAll(): Promise<{
    data: CompanyDocument[];
  }> {
    return {
      data: await this.companiesService.findAll()
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<{
    data: CompanyDocument;
  }> {
    return {
      data: await this.companiesService.findOne(id)
    };
  }

  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDto
  ): Promise<{
    data: CompanyDocument;
  }> {
    return {
      data: await this.companiesService.create(
        createCompanyDto
      )
    };
  }
}
