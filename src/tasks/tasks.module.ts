import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaExceptionFilter } from '../common/filters/prisma-exception.filter';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: PrismaExceptionFilter,
    },
  ],
})
export class TasksModule {}
