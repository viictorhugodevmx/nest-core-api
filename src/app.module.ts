import { Module } from '@nestjs/common';

import { OpportunitiesModule } from './modules/opportunities/opportunities.module';
import { StatusModule } from './modules/status/status.module';
import { CompaniesModule } from './modules/companies/companies.module';

@Module({
  imports: [
    StatusModule,
    OpportunitiesModule,
    CompaniesModule
  ]
})
export class AppModule {}
