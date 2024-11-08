import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Task with ID "${id}" not found`, HttpStatus.NOT_FOUND);
  }
}
