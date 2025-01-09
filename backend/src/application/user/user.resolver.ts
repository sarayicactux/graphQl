import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UserService } from './user.service';

import { User } from '../../models/user.model';
import { CreateUserDto, LoginUserDto, UserDto } from '../../DTO/user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, {
    description: 'Create a new user',
  })
  async registerUser(
    @Args('createUser') createUserDto: CreateUserDto,
  ): Promise<UserDto> {
    try {
      const newUser = await this.userService.register(createUserDto);
      return newUser;
    } catch (error) {
      throw error;
    }
  }
  @Mutation(() => User, {
    description: 'login user',
  })
  async loginUser(
    @Args('loginUserDto') loginUserDto: LoginUserDto,
  ): Promise<UserDto> {
    try {
      const newUser = await this.userService.login(loginUserDto);
      return newUser;
    } catch (error) {
      return error;
    }
  }
  @Query(() => User, {
    description: 'Get user by user id',
  })
  async findOne(@Args('id', { type: () => ID }) id: number): Promise<UserDto> {
    try {
      const user = await this.userService.get(id);
      return user;
    } catch (error) {
      return error;
    }
  }
  @Query(() => [User], {
    description: 'Get all users',
  })
  async findAll(): Promise<UserDto[]> {
    try {
      const users = await this.userService.all();
      return users;
    } catch (error) {
      return error;
    }
  }
}
