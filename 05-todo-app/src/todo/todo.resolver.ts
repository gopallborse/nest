import {
  Resolver,
  Query,
  Mutation,
  Args,
  ObjectType,
  Field,
  ID,
} from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './todo.schema';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@ObjectType()
export class TodoType {
  @Field(() => ID)
  _id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  completed: boolean;
}

@Resolver(() => TodoType)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => TodoType)
  createTodo(@Args('input') input: CreateTodoInput) {
    return this.todoService.create(input);
  }

  @Query(() => [TodoType])
  todos() {
    return this.todoService.findAll();
  }

  @Query(() => TodoType)
  todo(@Args('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Mutation(() => TodoType)
  updateTodo(@Args('input') input: UpdateTodoInput) {
    return this.todoService.update(input);
  }

  @Mutation(() => TodoType)
  deleteTodo(@Args('id') id: string) {
    return this.todoService.remove(id);
  }
}
