import { Table, Column, Model } from 'sequelize-typescript';
import { ObjectType, Field, ID } from '@nestjs/graphql';

import Sequelize from 'sequelize';

@Table({
  tableName: 'users',
})
@ObjectType()
export class User extends Model {
  @Field(() => ID)
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: Sequelize.INTEGER,
  })
  id: number;

  @Field()
  @Column({
    type: Sequelize.STRING(100),
    unique: true,
    allowNull: false,
  })
  username: string;

  @Field()
  @Column({
    type: Sequelize.STRING(200),
    allowNull: false,
  })
  password: string;

  @Field()
  @Column({
    type: Sequelize.STRING(200),
    allowNull: false,
  })
  name: string;

  @Field()
  @Column({
    type: Sequelize.STRING(200),
    allowNull: false,
  })
  lastName: string;

  @Field()
  @Column({
    type: Sequelize.TEXT,
    allowNull: true,
  })
  token: string;

  @Field()
  @Column({
    defaultValue: new Date(),
    allowNull: false,
    type: Sequelize.DATE,
  })
  createdAt: Date;

  @Field()
  @Column({
    defaultValue: new Date(),
    allowNull: false,
    type: Sequelize.DATE,
  })
  updatedAt: Date;
}
