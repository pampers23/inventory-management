import { Optional } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'role'>;

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING,
  })
  declare email: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    defaultValue: 'staff',
  })
  declare role: string;
}
