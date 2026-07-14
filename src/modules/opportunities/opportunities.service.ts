import {
  Injectable,
  NotFoundException
} from '@nestjs/common';

import {
  InjectModel
} from '@nestjs/mongoose';

import type {
  Model,
  SortOrder
} from 'mongoose';

import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { FilterOpportunitiesDto } from './dto/filter-opportunities.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import {
  Opportunity,
  OpportunityDocument
} from './schemas/opportunity.schema';

export interface OpportunitiesResult {
  data: OpportunityDocument[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    sortBy: string;
    order: string;
  };
}

@Injectable()
export class OpportunitiesService {
  constructor(
    @InjectModel(Opportunity.name)
    private readonly opportunityModel:
      Model<OpportunityDocument>
  ) {}

  async findAll(
    filters: FilterOpportunitiesDto
  ): Promise<OpportunitiesResult> {
    const query: Record<string, unknown> = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.workMode) {
      query.workMode = filters.workMode;
    }

    if (filters.company) {
      query.company = {
        $regex: filters.company,
        $options: 'i'
      };
    }

    const sort: Record<string, SortOrder> = {
      [filters.sortBy]:
        filters.order === 'asc'
          ? 1
          : -1
    };

    const skip = (
      filters.page - 1
    ) * filters.limit;

    const [
      data,
      total
    ] = await Promise.all([
      this.opportunityModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(filters.limit)
        .exec(),

      this.opportunityModel
        .countDocuments(query)
        .exec()
    ]);

    return {
      data,
      meta: {
        page: filters.page,
        limit: filters.limit,
        total,
        totalPages: Math.ceil(
          total / filters.limit
        ),
        sortBy: filters.sortBy,
        order: filters.order
      }
    };
  }

  async findOne(
    id: string
  ): Promise<OpportunityDocument> {
    const opportunity = await this.opportunityModel
      .findById(id)
      .exec();

    if (!opportunity) {
      throw new NotFoundException(
        `Opportunity with id ${id} was not found`
      );
    }

    return opportunity;
  }

  async create(
    createOpportunityDto: CreateOpportunityDto
  ): Promise<OpportunityDocument> {
    const opportunity = new this.opportunityModel(
      createOpportunityDto
    );

    return opportunity.save();
  }

  async update(
    id: string,
    updateOpportunityDto: UpdateOpportunityDto
  ): Promise<OpportunityDocument> {
    const opportunity = await this.opportunityModel
      .findByIdAndUpdate(
        id,
        updateOpportunityDto,
        {
          new: true,
          runValidators: true
        }
      )
      .exec();

    if (!opportunity) {
      throw new NotFoundException(
        `Opportunity with id ${id} was not found`
      );
    }

    return opportunity;
  }

  async remove(
    id: string
  ): Promise<void> {
    const opportunity = await this.opportunityModel
      .findByIdAndDelete(id)
      .exec();

    if (!opportunity) {
      throw new NotFoundException(
        `Opportunity with id ${id} was not found`
      );
    }
  }
}
