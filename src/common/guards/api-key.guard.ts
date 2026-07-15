import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import type {
  Request
} from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request>();

    const receivedApiKey = request.header(
      'X-API-Key'
    );

    const expectedApiKey =
      this.configService.getOrThrow<string>(
        'API_KEY'
      );

    if (
      !receivedApiKey
      || receivedApiKey !== expectedApiKey
    ) {
      throw new UnauthorizedException(
        'A valid API key is required'
      );
    }

    return true;
  }
}
