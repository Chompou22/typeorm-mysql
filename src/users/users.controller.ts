import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { CreateUserPostDto } from './dtos/CreateUserPost.dto';
import { CreateUserProfileDto } from './dtos/CreateUserProfile.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UserNotFoundException } from './exceptions/userNotFound.exception';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async getUsers() {
    try {
      return await this.userService.findUsers();
    } catch (error) {
      throw new HttpException(
        'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @UseFilters(HttpExceptionFilter)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    try {
      return await this.userService.getUserById(+id);
    } catch (error) {
      throw new UserNotFoundException();
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      await this.userService.updateUser(+id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    try {
      await this.userService.deleteUser(+id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // A single user profile routes

  @Post(':id/profiles')
  @UsePipes(new ValidationPipe())
  async createUserProfile(
    @Param('id') id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    try {
      return await this.userService.createUserProfile(
        +id,
        createUserProfileDto,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to create user profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post(':id/posts')
  @UsePipes(new ValidationPipe())
  async createUserPost(
    @Param('id') id: number,
    @Body() createUserPostDto: CreateUserPostDto,
  ) {
    try {
      return await this.userService.createUserPost(+id, createUserPostDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create user post',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id/bytheirfk')
  async deleteUserPk(@Param('id') id: number) {
    try {
      await this.userService.deleteUserPk(+id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete user by foreign key',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
