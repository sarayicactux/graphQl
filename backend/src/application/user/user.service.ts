import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { HttpStatus } from '@nestjs/common';
import jwt = require('jsonwebtoken');

import * as Models from '../../models/index';
import { CreateUserDto, LoginUserDto, UserDto } from '../../DTO/user.dto';
import * as jwtConfig from '../../configs/jwt.json';

//const env = process.env.NODE_ENV.toLowerCase();
const env = 'test'.toLowerCase();
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
    const user: any = await Models.User.findOne({
      where: { username, password },
    });
    if (!user) {
      throw new GraphQLError('Login Failed', {
        extensions: {
          code: HttpStatus.FORBIDDEN,
        },
      });
    }
    const expiresIn = 60 * 60 * 24;
    user.token = jwt.sign(
      { id: user.id, name: user.name },
      jwtConfig[env].ACCESS_TOKEN.secretKey,
      {
        algorithm:
          jwtConfig[env].ACCESS_TOKEN.REFRESHABLE.signOptions.algorithm,
        expiresIn,
      },
    );
    return user;
  }
  async get(id: number, headers): Promise<UserDto | null> {
    if (!headers.token) {
      throw new GraphQLError('FORBIDDEN', {
        extensions: {
          code: HttpStatus.FORBIDDEN,
        },
      });
    }
    const { token } = headers;
    const tokenValues = jwt.verify(
      token,
      jwtConfig[env].ACCESS_TOKEN.secretKey,
    );
    if (!tokenValues || !tokenValues.id) {
      throw new GraphQLError('FORBIDDEN', {
        extensions: {
          code: HttpStatus.FORBIDDEN,
        },
      });
    }
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
  async all(headers): Promise<UserDto[]> {
    if (!headers.token) {
      throw new GraphQLError('FORBIDDEN', {
        extensions: {
          code: HttpStatus.FORBIDDEN,
        },
      });
    }
    const { token } = headers;
    const tokenValues = jwt.verify(
      token,
      jwtConfig[env].ACCESS_TOKEN.secretKey,
    );
    if (!tokenValues || !tokenValues.id) {
      throw new GraphQLError('FORBIDDEN', {
        extensions: {
          code: HttpStatus.FORBIDDEN,
        },
      });
    }
    const users = await Models.User.findAll();
    return users;
  }
}
