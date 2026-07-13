import { Module } from '@nestjs/common';

import { OpportunitiesModule } from './modules/opportunities/opportunities.module';
import { StatusModule } from './modules/status/status.module';

@Module({
  imports: [
    StatusModule,
    OpportunitiesModule
  ]
})
export class AppModule {}
