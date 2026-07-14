import {
  Injectable,
  NotFoundException
} from '@nestjs/common';

import {
  InjectModel
} from '@nestjs/mongoose';

import type {
  Model
} from 'mongoose';

import { CreateCompanyDto } from './dto/create-company.dto';
import {
  Company,
  CompanyDocument
} from './schemas/company.schema';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>
  ) {}

  async findAll(): Promise<CompanyDocument[]> {
    return this.companyModel
      .find()
      .sort({
        createdAt: -1
      })
      .exec();
  }

  async findOne(
    id: string
  ): Promise<CompanyDocument> {
    const company = await this.companyModel
      .findById(id)
      .exec();

    if (!company) {
      throw new NotFoundException(
        `Company with id ${id} was not found`
      );
    }

    return company;
  }

  async create(
    createCompanyDto: CreateCompanyDto
  ): Promise<CompanyDocument> {
    const company = new this.companyModel(
      createCompanyDto
    );

    return company.save();
  }
}
