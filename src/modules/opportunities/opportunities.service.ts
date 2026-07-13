import {
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { FilterOpportunitiesDto } from './dto/filter-opportunities.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';

export interface Opportunity {
  id: number;
  company: string;
  position: string;
  status: string;
  workMode: string;
  salary: number | null;
}

export interface OpportunitiesResult {
  data: Opportunity[];
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
  private readonly opportunities: Opportunity[] = [
    {
      id: 1,
      company: 'TechNova',
      position: 'Frontend Developer React',
      status: 'applied',
      workMode: 'remote',
      salary: 45000
    },
    {
      id: 2,
      company: 'Digital Solutions',
      position: 'Angular Developer',
      status: 'interview',
      workMode: 'hybrid',
      salary: 48000
    },
    {
      id: 3,
      company: 'Cloud Systems',
      position: 'Frontend Engineer',
      status: 'saved',
      workMode: 'remote',
      salary: null
    }
  ];

  findAll(
    filters: FilterOpportunitiesDto
  ): OpportunitiesResult {
    let results = [...this.opportunities];

    if (filters.status) {
      results = results.filter(
        (opportunity) =>
          opportunity.status === filters.status
      );
    }

    if (filters.workMode) {
      results = results.filter(
        (opportunity) =>
          opportunity.workMode === filters.workMode
      );
    }

    if (filters.company) {
      const company = filters.company.toLowerCase();

      results = results.filter(
        (opportunity) =>
          opportunity.company
            .toLowerCase()
            .includes(company)
      );
    }

    results.sort((first, second) => {
      const firstValue = first[filters.sortBy];
      const secondValue = second[filters.sortBy];

      if (
        firstValue === null
        && secondValue === null
      ) {
        return 0;
      }

      if (firstValue === null) {
        return 1;
      }

      if (secondValue === null) {
        return -1;
      }

      const comparison = typeof firstValue === 'number'
        && typeof secondValue === 'number'
        ? firstValue - secondValue
        : String(firstValue).localeCompare(
          String(secondValue)
        );

      return filters.order === 'asc'
        ? comparison
        : comparison * -1;
    });

    const total = results.length;

    const startIndex = (
      filters.page - 1
    ) * filters.limit;

    const data = results.slice(
      startIndex,
      startIndex + filters.limit
    );

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

  findOne(id: number): Opportunity {
    const opportunity = this.opportunities.find(
      (item) => item.id === id
    );

    if (!opportunity) {
      throw new NotFoundException(
        `Opportunity with id ${id} was not found`
      );
    }

    return opportunity;
  }

  create(
    createOpportunityDto: CreateOpportunityDto
  ): Opportunity {
    const opportunity: Opportunity = {
      id: this.getNextId(),
      ...createOpportunityDto
    };

    this.opportunities.push(opportunity);

    return opportunity;
  }

  update(
    id: number,
    updateOpportunityDto: UpdateOpportunityDto
  ): Opportunity {
    const opportunity = this.findOne(id);

    Object.assign(
      opportunity,
      updateOpportunityDto
    );

    return opportunity;
  }

  remove(id: number): void {
    const opportunity = this.findOne(id);

    const index = this.opportunities.indexOf(
      opportunity
    );

    this.opportunities.splice(index, 1);
  }

  private getNextId(): number {
    const highestId = Math.max(
      ...this.opportunities.map(
        (opportunity) => opportunity.id
      ),
      0
    );

    return highestId + 1;
  }
}
