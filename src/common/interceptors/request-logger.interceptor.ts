import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor
} from '@nestjs/common';

import {
  catchError,
  tap,
  throwError
} from 'rxjs';

import type {
  Observable
} from 'rxjs';

import type {
  Response
} from 'express';

import type {
  RequestWithId
} from '../middlewares/request-id.middleware';

@Injectable()
export class RequestLoggerInterceptor
implements NestInterceptor {
  private readonly logger = new Logger(
    RequestLoggerInterceptor.name
  );

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<unknown> {
    const request = context
      .switchToHttp()
      .getRequest<RequestWithId>();

    const response = context
      .switchToHttp()
      .getResponse<Response>();

    const startedAt = process.hrtime.bigint();

    return next.handle().pipe(
      tap(() => {
        this.logRequest(
          request,
          response,
          startedAt,
          'completed'
        );
      }),
      catchError((error: unknown) => {
        this.logRequest(
          request,
          response,
          startedAt,
          'failed'
        );

        return throwError(() => error);
      })
    );
  }

  private logRequest(
    request: RequestWithId,
    response: Response,
    startedAt: bigint,
    result: 'completed' | 'failed'
  ): void {
    const finishedAt = process.hrtime.bigint();

    const durationMs = Number(
      finishedAt - startedAt
    ) / 1_000_000;

    const logEntry = {
      requestId: request.requestId,
      method: request.method,
      path: request.originalUrl,
      statusCode: response.statusCode,
      durationMs: Number(durationMs.toFixed(2)),
      result
    };

    this.logger.log(
      JSON.stringify(logEntry)
    );
  }
}
