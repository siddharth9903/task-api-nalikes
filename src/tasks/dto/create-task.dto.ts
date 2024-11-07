import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Complete Project Documentation',
    description: 'The title of the task',
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Write comprehensive API documentation',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    default: TaskStatus.PENDING,
    required: false,
    description: 'Task status (defaults to PENDING if not provided)',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
