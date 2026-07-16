import {
  Injectable,
  NestMiddleware
} from '@nestjs/common';

import {
  randomUUID
} from 'node:crypto';

import type {
  NextFunction,
  Request,
  Response
} from 'express';

export interface RequestWithId extends Request {
  requestId?: string;
}

@Injectable()
export class RequestIdMiddleware
implements NestMiddleware {
  use(
    request: RequestWithId,
    response: Response,
    next: NextFunction
  ): void {
    const incomingRequestId = request.header(
      'X-Request-Id'
    );

    const requestId =
      incomingRequestId?.trim()
      || randomUUID();

    request.requestId = requestId;

    response.setHeader(
      'X-Request-Id',
      requestId
    );

    next();
  }
}
