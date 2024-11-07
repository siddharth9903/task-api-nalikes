import { Task, TaskStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TaskEntity implements Task {
  @ApiProperty({
    example: 'f7554191-c7e7-4722-9a86-4f2bd72234b0',
  })
  id: string;

  @ApiProperty({
    example: 'Complete Project Documentation',
  })
  title: string;

  @ApiProperty({
    example: 'Write comprehensive API documentation',
  })
  description: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    default: TaskStatus.PENDING,
    description: 'Task status',
  })
  status: TaskStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
