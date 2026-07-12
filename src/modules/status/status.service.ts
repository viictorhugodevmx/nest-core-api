import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
  getStatus() {
    return {
      status: 'ok',
      app: 'nest-core-api',
      framework: 'NestJS',
      timestamp: new Date().toISOString()
    };
  }
}
