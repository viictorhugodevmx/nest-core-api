import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';

import {
  map
} from 'rxjs';

import type {
  Observable
} from 'rxjs';

interface ResponseWithData {
  data?: unknown;
  meta?: unknown;
}

@Injectable()
export class ResponseInterceptor
implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    return next.handle().pipe(
      map((responseBody: ResponseWithData) => {
        if (
          responseBody
          && typeof responseBody === 'object'
          && 'data' in responseBody
        ) {
          return {
            success: true,
            ...responseBody,
            timestamp: new Date().toISOString()
          };
        }

        return {
          success: true,
          data: responseBody,
          timestamp: new Date().toISOString()
        };
      })
    );
  }
}
