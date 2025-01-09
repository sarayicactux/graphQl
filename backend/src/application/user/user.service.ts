import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { HttpStatus } from '@nestjs/common';

import * as Models from '../../models/index';
import { CreateUserDto, LoginUserDto, UserDto } from '../../DTO/user.dto';

@Injectable()
export class UserService {
  async register(createUserDto: CreateUserDto): Promise<UserDto> {
    const { username, password, name, lastName } = createUserDto;
    const user = await Models.User.findOne({ where: { username } });
    if (user) {
      throw new GraphQLError('Username already exists', {
        extensions: {
          code: HttpStatus.CONFLICT,
        },
      });
    }
    return await Models.User.create({ username, password, name, lastName });
  }

  async login(loginUserDto: LoginUserDto): Promise<UserDto | null> {
    const { username, password } = loginUserDto;
    const user = await Models.User.findOne({ where: { username, password } });
    if (!user) {
      throw new GraphQLError('Login Failed', {
        extensions: {
          code: HttpStatus.FORBIDDEN,
        },
      });
    }
    return user;
  }
  async get(id: number): Promise<UserDto | null> {
    const user = await Models.User.findByPk(id);
    if (!user) {
      throw new GraphQLError('User not found', {
        extensions: {
          code: HttpStatus.NOT_FOUND,
        },
      });
    }
    return user;
  }
  async all(): Promise<UserDto[]> {
    const users = await Models.User.findAll();
    return users;
  }
}
