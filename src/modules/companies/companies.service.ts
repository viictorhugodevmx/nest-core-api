import {
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { CreateCompanyDto } from './dto/create-company.dto';

export interface Company {
  id: number;
  name: string;
  industry: string;
  website?: string;
}

@Injectable()
export class CompaniesService {
  private readonly companies: Company[] = [
    {
      id: 1,
      name: 'TechNova',
      industry: 'Software',
      website: 'https://technova.example.com'
    },
    {
      id: 2,
      name: 'Digital Solutions',
      industry: 'Technology Consulting'
    },
    {
      id: 3,
      name: 'Cloud Systems',
      industry: 'Cloud Computing'
    }
  ];

  findAll(): Company[] {
    return this.companies;
  }

  findOne(id: number): Company {
    const company = this.companies.find(
      (item) => item.id === id
    );

    if (!company) {
      throw new NotFoundException(
        `Company with id ${id} was not found`
      );
    }

    return company;
  }

  create(
    createCompanyDto: CreateCompanyDto
  ): Company {
    const company: Company = {
      id: this.getNextId(),
      ...createCompanyDto
    };

    this.companies.push(company);

    return company;
  }

  private getNextId(): number {
    const highestId = Math.max(
      ...this.companies.map(
        (company) => company.id
      ),
      0
    );

    return highestId + 1;
  }
}
