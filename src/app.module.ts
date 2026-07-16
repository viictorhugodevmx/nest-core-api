import {
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common';

import {
  ConfigModule,
  ConfigService
} from '@nestjs/config';

import {
  APP_GUARD
} from '@nestjs/core';

import {
  MongooseModule
} from '@nestjs/mongoose';

import {
  ThrottlerGuard,
  ThrottlerModule
} from '@nestjs/throttler';

import { RequestIdMiddleware } from './common/middlewares/request-id.middleware';
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

    ThrottlerModule.forRootAsync({
      inject: [
        ConfigService
      ],
      useFactory: (
        configService: ConfigService
      ) => [
        {
          ttl: configService.get<number>(
            'RATE_LIMIT_TTL_MS',
            60000
          ),
          limit: configService.get<number>(
            'RATE_LIMIT_MAX_REQUESTS',
            100
          )
        }
      ]
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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule implements NestModule {
  configure(
    consumer: MiddlewareConsumer
  ): void {
    consumer
      .apply(RequestIdMiddleware)
      .forRoutes('*');
  }
}
