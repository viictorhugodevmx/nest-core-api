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

import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import {
  Recruiter,
  RecruiterDocument
} from './schemas/recruiter.schema';

@Injectable()
export class RecruitersService {
  constructor(
    @InjectModel(Recruiter.name)
    private readonly recruiterModel: Model<RecruiterDocument>
  ) {}

  async findAll(): Promise<RecruiterDocument[]> {
    return this.recruiterModel
      .find()
      .sort({
        createdAt: -1
      })
      .exec();
  }

  async findOne(
    id: string
  ): Promise<RecruiterDocument> {
    const recruiter = await this.recruiterModel
      .findById(id)
      .exec();

    if (!recruiter) {
      throw new NotFoundException(
        `Recruiter with id ${id} was not found`
      );
    }

    return recruiter;
  }

  async create(
    createRecruiterDto: CreateRecruiterDto
  ): Promise<RecruiterDocument> {
    const recruiter = new this.recruiterModel(
      createRecruiterDto
    );

    return recruiter.save();
  }
}
