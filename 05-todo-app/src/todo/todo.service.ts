import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.schema';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  create(input: CreateTodoInput) {
    return this.todoModel.create(input);
  }

  findAll() {
    return this.todoModel.find().exec();
  }

  findOne(id: string) {
    return this.todoModel.findById(id).exec();
  }

  update(input: UpdateTodoInput) {
    return this.todoModel
      .findByIdAndUpdate(input.id, input, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}
