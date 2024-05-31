import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { CreateUserPostDto } from './dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from './dtos/CreateUserProfile.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.findUsers();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    await this.userService.deleteUser(+id);
  }

  // A single user profile routes

  @Post(':id/profiles')
  @UsePipes(ValidationPipe)
  createUserProfile(
    @Param('id') id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(+id, createUserProfileDto);
  }

  @Post(':id/posts')
  @UsePipes(ValidationPipe)
  createUserPost(
    @Param('id') id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    return this.userService.createUserPost(+id, createUserPostDto);
  }

  @Delete(':id/bytheirfk')
  async deleteUserPk(@Param('id') id: number) {
    await this.userService.deleteUserPk(+id);
  }
}
