import {
  Injectable,
  NotFoundException
} from '@nestjs/common';

import { CreateRecruiterDto } from './dto/create-recruiter.dto';

export interface Recruiter {
  id: number;
  name: string;
  email: string;
  company: string;
  phone?: string;
}

@Injectable()
export class RecruitersService {
  private readonly recruiters: Recruiter[] = [
    {
      id: 1,
      name: 'Laura Méndez',
      email: 'laura@technova.example.com',
      company: 'TechNova'
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      email: 'carlos@digitalsolutions.example.com',
      company: 'Digital Solutions',
      phone: '555-0102'
    }
  ];

  findAll(): Recruiter[] {
    return this.recruiters;
  }

  findOne(id: number): Recruiter {
    const recruiter = this.recruiters.find(
      (item) => item.id === id
    );

    if (!recruiter) {
      throw new NotFoundException(
        `Recruiter with id ${id} was not found`
      );
    }

    return recruiter;
  }

  create(
    createRecruiterDto: CreateRecruiterDto
  ): Recruiter {
    const recruiter: Recruiter = {
      id: this.getNextId(),
      ...createRecruiterDto
    };

    this.recruiters.push(recruiter);

    return recruiter;
  }

  private getNextId(): number {
    const highestId = Math.max(
      ...this.recruiters.map(
        (recruiter) => recruiter.id
      ),
      0
    );

    return highestId + 1;
  }
}
