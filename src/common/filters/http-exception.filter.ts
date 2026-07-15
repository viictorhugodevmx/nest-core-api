import {
  Catch,
  HttpException,
  HttpStatus
} from '@nestjs/common';

import type {
  ArgumentsHost,
  ExceptionFilter
} from '@nestjs/common';

import type {
  Request,
  Response
} from 'express';

interface ExceptionResponse {
  message?: string | string[];
  error?: string;
}

@Catch()
export class HttpExceptionFilter
implements ExceptionFilter {
  catch(
    exception: unknown,
    host: ArgumentsHost
  ): void {
    const context = host.switchToHttp();

    const response = context.getResponse<Response>();

    const request = context.getRequest<Request>();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : null;

    const normalizedResponse =
      typeof exceptionResponse === 'string'
        ? {
            message: exceptionResponse
          }
        : exceptionResponse as
          ExceptionResponse | null;

    response.status(statusCode).json({
      statusCode,
      message:
        normalizedResponse?.message
        ?? 'Internal server error',
      error:
        normalizedResponse?.error
        ?? (
          statusCode === 500
            ? 'Internal Server Error'
            : undefined
        ),
      path: request.originalUrl,
      timestamp: new Date().toISOString()
    });
  }
}
