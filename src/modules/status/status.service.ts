import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StatusService {
  constructor(
    private readonly configService: ConfigService
  ) {}

  getStatus() {
    return {
      status: 'ok',
      app: this.configService.get<string>(
        'APP_NAME',
        'nest-core-api'
      ),
      framework: 'NestJS',
      timestamp: new Date().toISOString()
    };
  }
}
