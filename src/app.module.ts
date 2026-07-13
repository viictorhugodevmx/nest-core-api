import { Module } from '@nestjs/common';

import { OpportunitiesModule } from './modules/opportunities/opportunities.module';
import { StatusModule } from './modules/status/status.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { RecruitersModule } from './modules/recruiters/recruiters.module';

@Module({
  imports: [
    StatusModule,
    OpportunitiesModule,
    CompaniesModule,
    RecruitersModule
  ]
})
export class AppModule {}
