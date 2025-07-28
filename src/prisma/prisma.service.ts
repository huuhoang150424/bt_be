import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'stdout', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    });
    this.logger.log('PrismaService được khởi tạo');
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Kết nối tới MongoDB thành công');
    } catch (error) {
      this.logger.error('Kết nối tới MongoDB thất bại', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Ngắt kết nối MongoDB');
  }

  // async healthCheck() {
  //   try {
  //     await this.$queryRaw`SELECT 1`;
  //     return { status: 'healthy' };
  //   } catch (error) {
  //     this.logger.error('Health check failed', error);
  //     return { status: 'unhealthy', error: error.message };
  //   }
  // }
}
