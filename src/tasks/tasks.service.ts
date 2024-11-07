import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    // Status will default to PENDING if not provided
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  findAll(): Promise<Task[]> {
    return this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string): Promise<Task> {
    return this.prisma.task.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  remove(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
