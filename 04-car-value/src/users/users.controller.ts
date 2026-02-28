import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  NotFoundException,
  // UseInterceptors,
  // ClassSerializerInterceptor,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
// import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor) // removed in order to make it global scoped instead of controller scoped
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }

  // @Get('/colors')
  // getColor(@Session() session: any) {
  //   return session.color;
  // }

  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findOne(session.userId);
  // }

  @UseGuards(AuthGuard)
  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    // this.usersService.create(body.email, body.password);
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('Handler is running.');

    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
