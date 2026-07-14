import { Module } from '@nestjs/common';
import {
  ConfigModule,
  ConfigService
} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CompaniesModule } from './modules/companies/companies.module';
import { InterviewNotesModule } from './modules/interview-notes/interview-notes.module';
import { OpportunitiesModule } from './modules/opportunities/opportunities.module';
import { RecruitersModule } from './modules/recruiters/recruiters.module';
import { StatusModule } from './modules/status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    MongooseModule.forRootAsync({
      inject: [
        ConfigService
      ],
      useFactory: (
        configService: ConfigService
      ) => ({
        uri: configService.getOrThrow<string>(
          'MONGODB_URI'
        )
      })
    }),

    StatusModule,
    OpportunitiesModule,
    CompaniesModule,
    RecruitersModule,
    InterviewNotesModule
  ]
})
export class AppModule {}
