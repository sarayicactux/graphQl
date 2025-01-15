import { InputType, Field, ID } from '@nestjs/graphql';
import { IsInt, IsNotEmpty } from 'class-validator';

@InputType({ description: 'User object' })
export class CreateUserDto {
  @IsNotEmpty()
  @Field(() => String, { description: 'username of the user' })
  username: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'password of the user' })
  password: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'name of the user' })
  name: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'lastname of the user' })
  lastName: string;
}

@InputType()
export class LoginUserDto {
  @IsNotEmpty()
  @Field(() => String, { description: 'username of the user' })
  username: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'password of the user' })
  password: string;
}

@InputType()
export class UserDto {
  @IsNotEmpty()
  @IsInt()
  @Field(() => ID, { description: 'The unique identifier of the user' })
  id: number;

  @IsNotEmpty()
  @Field(() => String, { description: 'username of the user' })
  username: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'password of the user' })
  password: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'name of the user' })
  name: string;

  @Field(() => String, { description: 'auth token' })
  token?: string;

  @IsNotEmpty()
  @Field(() => String, { description: 'lastname of the user' })
  lastName: string;

  @Field(() => Date, { description: 'createdAt of the user' })
  createdAt: Date;

  @Field(() => Date, { description: 'createdAt of the user' })
  updatedAt: Date;
}
