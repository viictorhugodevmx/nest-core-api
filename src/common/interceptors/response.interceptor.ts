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

import type {
  RequestWithId
} from '../middlewares/request-id.middleware';

interface ResponseWithData {
  data?: unknown;
  meta?: unknown;
}

@Injectable()
export class ResponseInterceptor
implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    const request = context
      .switchToHttp()
      .getRequest<RequestWithId>();

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
            requestId: request.requestId,
            timestamp: new Date().toISOString()
          };
        }

        return {
          success: true,
          data: responseBody,
          requestId: request.requestId,
          timestamp: new Date().toISOString()
        };
      })
    );
  }
}
