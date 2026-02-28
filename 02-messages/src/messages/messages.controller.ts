import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { CreateMessageDto } from './dtos/create-message.dto';

import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  // messagesService: MessagesService;

  // constructor() {
  //   // Controller is creating it's own dependencies. Inversion of control. NEVER do this in real apps. This was temporary just to understand the concept of Dependency injection. Will use DI and remove this soon.
  //   this.messagesService = new MessagesService();
  // }

  // ---------------------------------

  // messagesService: MessagesService;
  constructor(
    public messagesService: MessagesService,
    public messagesService1: MessagesService,
    public messagesService2: MessagesService,
  ) {
    // Same instance is shared in multiple locations in the project. Javascript same address location of functions.
    console.log(messagesService === messagesService1); // true
    console.log(messagesService1 === messagesService2); // true
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }
}
