// src/tasks/tasks.service.ts
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.prisma.task.create({
        data: createTaskDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.prisma.task.findMany({
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch tasks');
    }
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id },
      });

      if (!task) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }

      return task;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch task');
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    try {
      const task = await this.prisma.task.update({
        where: { id },
        data: updateTaskDto,
      });

      return task;
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma's not found error code
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.task.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        // Prisma's not found error code
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }
      throw new InternalServerErrorException('Failed to delete task');
    }
  }
}
