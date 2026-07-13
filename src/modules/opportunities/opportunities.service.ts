import { Injectable } from '@nestjs/common';

export interface Opportunity {
  id: number;
  company: string;
  position: string;
  status: string;
  workMode: string;
  salary: number | null;
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

  findAll(): Opportunity[] {
    return this.opportunities;
  }

  findOne(id: number): Opportunity | undefined {
    return this.opportunities.find(
      (opportunity) => opportunity.id === id
    );
  }
}
